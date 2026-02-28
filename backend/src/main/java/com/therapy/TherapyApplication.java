package com.therapy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TherapyApplication {

    public static void main(String[] args) {
        // Fix Railway DATABASE_URL format before Spring Boot processes it
        // Railway provides: postgresql://user:pass@host:port/db
        // Spring Boot needs: jdbc:postgresql://user:pass@host:port/db
        String dbUrl = System.getenv("DATABASE_URL");
        if (dbUrl != null && !dbUrl.startsWith("jdbc:")) {
            if (dbUrl.startsWith("postgresql://")) {
                System.setProperty("spring.datasource.url", "jdbc:" + dbUrl);
            } else if (dbUrl.startsWith("postgres://")) {
                System.setProperty("spring.datasource.url",
                    "jdbc:postgresql://" + dbUrl.substring("postgres://".length()));
            }
            System.setProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");
        }

        SpringApplication.run(TherapyApplication.class, args);
    }
}
