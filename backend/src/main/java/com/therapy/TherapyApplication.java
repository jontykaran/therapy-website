package com.therapy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TherapyApplication {

    public static void main(String[] args) {
        // Fix Railway DATABASE_URL format before Spring Boot processes it
        // Railway provides: postgresql://user:pass@host:port/db
        // Spring Boot needs: jdbc:postgresql://user:pass@host:port/db
        // Check all possible env var names Railway or user might set
        String[] envVarNames = {"DATABASE_URL", "SPRING_DATASOURCE_URL", "DATABASE_PRIVATE_URL"};
        for (String envName : envVarNames) {
            String dbUrl = System.getenv(envName);
            if (dbUrl != null && !dbUrl.isEmpty() && !dbUrl.startsWith("jdbc:")) {
                String jdbcUrl;
                if (dbUrl.startsWith("postgresql://")) {
                    jdbcUrl = "jdbc:" + dbUrl;
                } else if (dbUrl.startsWith("postgres://")) {
                    jdbcUrl = "jdbc:postgresql://" + dbUrl.substring("postgres://".length());
                } else {
                    continue;
                }
                // Set as system property (highest precedence in Spring Boot)
                System.setProperty("spring.datasource.url", jdbcUrl);
                System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");
                // Also override the env var name so YAML ${SPRING_DATASOURCE_URL:...} picks it up
                System.setProperty("SPRING_DATASOURCE_URL", jdbcUrl);
                System.out.println("DATABASE: Converted " + envName + " to JDBC format");
                break;
            }
        }

        SpringApplication.run(TherapyApplication.class, args);
    }
}
