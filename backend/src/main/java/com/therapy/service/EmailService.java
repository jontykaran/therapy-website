package com.therapy.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
@Slf4j
public class EmailService {

    private static final String RESEND_API_URL = "https://api.resend.com/emails";

    @Value("${app.notification-email}")
    private String notificationEmail;

    @Value("${app.from-email:onboarding@resend.dev}")
    private String fromEmail;

    @Value("${app.resend-api-key:}")
    private String resendApiKey;

    private final HttpClient httpClient;

    public EmailService() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(15))
                .build();
    }

    @Async
    public void sendContactNotification(String name, String email, String phone, String message) {
        log.info("EMAIL: Attempting to send via Resend HTTP API. From: {}, To: {}", fromEmail, notificationEmail);

        if (resendApiKey == null || resendApiKey.isBlank()) {
            log.warn("EMAIL: Resend API key not configured - skipping email for contact from: {}", email);
            return;
        }

        try {
            String emailBody = String.format("""
                    New contact form submission received:

                    Name: %s
                    Email: %s
                    Phone: %s

                    Message:
                    %s

                    ---
                    This is an automated notification from your website.
                    Reply to %s to respond to the client.
                    """, name, email, phone != null ? phone : "Not provided", message, email);

            // Build JSON payload (manual to avoid extra dependencies)
            String jsonPayload = String.format("""
                    {
                      "from": "%s",
                      "to": ["%s"],
                      "reply_to": "%s",
                      "subject": "New Contact Form Submission - Therapy By Rashi",
                      "text": %s
                    }
                    """,
                    escapeJson(fromEmail),
                    escapeJson(notificationEmail),
                    escapeJson(email),
                    toJsonString(emailBody));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(RESEND_API_URL))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(30))
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 || response.statusCode() == 201) {
                log.info("EMAIL: Successfully sent notification for contact from: {}. Response: {}", email, response.body());
            } else {
                log.error("EMAIL: Resend API returned status {}. Response: {}", response.statusCode(), response.body());
            }
        } catch (Exception e) {
            log.error("EMAIL: Failed to send notification via Resend API. Error: {}", e.getMessage(), e);
        }
    }

    /**
     * Test email connectivity - called from debug endpoint
     */
    public String testConnection() {
        if (resendApiKey == null || resendApiKey.isBlank()) {
            return "Resend API key not configured";
        }
        try {
            String jsonPayload = String.format("""
                    {
                      "from": "%s",
                      "to": ["%s"],
                      "subject": "Test Email - Therapy By Rashi",
                      "text": "This is a test email to verify Resend API configuration is working correctly."
                    }
                    """,
                    escapeJson(fromEmail),
                    escapeJson(notificationEmail));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(RESEND_API_URL))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(30))
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 || response.statusCode() == 201) {
                return "SUCCESS: Test email sent to " + notificationEmail + ". Response: " + response.body();
            } else {
                return "FAILED: Resend API status " + response.statusCode() + ". Response: " + response.body();
            }
        } catch (Exception e) {
            return "FAILED: " + e.getMessage();
        }
    }

    // Escape special JSON characters
    private String escapeJson(String value) {
        if (value == null) return "";
        return value.replace("\\", "\\\\")
                     .replace("\"", "\\\"")
                     .replace("\n", "\\n")
                     .replace("\r", "\\r")
                     .replace("\t", "\\t");
    }

    // Convert a string to a JSON string literal (with quotes and escaping)
    private String toJsonString(String value) {
        return "\"" + escapeJson(value) + "\"";
    }
}
