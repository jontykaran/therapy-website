package com.therapy.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();

        // Railway provides DATABASE_URL as postgresql://... but Spring needs jdbc:postgresql://...
        String url = datasourceUrl;
        if (url != null && url.startsWith("postgresql://")) {
            url = "jdbc:" + url;
        } else if (url != null && url.startsWith("postgres://")) {
            url = "jdbc:postgresql://" + url.substring("postgres://".length());
        }

        dataSource.setJdbcUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);

        // Auto-detect driver based on URL
        if (url != null && url.contains("postgresql")) {
            dataSource.setDriverClassName("org.postgresql.Driver");
        } else if (url != null && url.contains("h2")) {
            dataSource.setDriverClassName("org.h2.Driver");
        }

        return dataSource;
    }
}
