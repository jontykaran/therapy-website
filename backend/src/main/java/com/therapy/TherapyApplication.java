package com.therapy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URI;

@SpringBootApplication
public class TherapyApplication {

    public static void main(String[] args) {
        configureDatabase();
        SpringApplication.run(TherapyApplication.class, args);
    }

    /**
     * Configure database connection from Railway's DATABASE_URL.
     * Railway provides: postgresql://user:pass@host:port/db
     * Spring Boot needs: jdbc:postgresql://host:port/db with separate user/pass
     */
    private static void configureDatabase() {
        // Check all possible env var names
        String[] envVarNames = {"DATABASE_URL", "SPRING_DATASOURCE_URL", "DATABASE_PRIVATE_URL"};
        String rawUrl = null;

        for (String envName : envVarNames) {
            String val = System.getenv(envName);
            if (val != null && !val.isEmpty()) {
                rawUrl = val;
                System.out.println("DATABASE: Found " + envName);
                break;
            }
        }

        if (rawUrl == null) {
            System.out.println("DATABASE: No DATABASE_URL found, using H2 default");
            return;
        }

        // Already in JDBC format
        if (rawUrl.startsWith("jdbc:")) {
            System.setProperty("spring.datasource.url", rawUrl);
            System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");
            System.out.println("DATABASE: Using JDBC URL as-is");
            return;
        }

        try {
            // Parse: postgresql://user:pass@host:port/db
            String uriStr = rawUrl;
            if (uriStr.startsWith("postgres://")) {
                uriStr = "postgresql://" + uriStr.substring("postgres://".length());
            }

            URI uri = new URI(uriStr);
            String host = uri.getHost();
            int port = uri.getPort();
            String path = uri.getPath(); // /railway
            String userInfo = uri.getUserInfo(); // user:pass

            String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
            System.setProperty("spring.datasource.url", jdbcUrl);
            System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");

            if (userInfo != null && userInfo.contains(":")) {
                String[] parts = userInfo.split(":", 2);
                System.setProperty("spring.datasource.username", parts[0]);
                System.setProperty("spring.datasource.password", parts[1]);
            }

            System.out.println("DATABASE: Configured PostgreSQL at " + host + ":" + port + path);

        } catch (Exception e) {
            System.err.println("DATABASE: Failed to parse URL: " + e.getMessage());
        }
    }
}
