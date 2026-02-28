package com.therapy.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.notification-email}")
    private String notificationEmail;

    @Value("${app.from-email:${spring.mail.username:}}")
    private String fromEmail;

    @Value("${spring.mail.host:}")
    private String smtpHost;

    @Async
    public void sendContactNotification(String name, String email, String phone, String message) {
        log.info("EMAIL: Attempting to send notification. SMTP Host: {}, From: {}, To: {}", smtpHost, fromEmail, notificationEmail);

        if (fromEmail == null || fromEmail.isBlank()) {
            log.warn("EMAIL: SMTP not configured (no username) - skipping email for contact from: {}", email);
            return;
        }

        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(notificationEmail);
            mail.setReplyTo(email);
            mail.setSubject("New Contact Form Submission - Therapy By Rashi");
            mail.setText(String.format("""
                    New contact form submission received:

                    Name: %s
                    Email: %s
                    Phone: %s

                    Message:
                    %s

                    ---
                    This is an automated notification from your website.
                    Reply directly to this email to respond to the client.
                    """, name, email, phone != null ? phone : "Not provided", message));

            mailSender.send(mail);
            log.info("EMAIL: Successfully sent notification for contact from: {}", email);
        } catch (Exception e) {
            log.error("EMAIL: Failed to send notification. Error: {} | Cause: {}", e.getMessage(),
                    e.getCause() != null ? e.getCause().getMessage() : "none", e);
        }
    }

    /**
     * Test email connectivity - called from health/debug endpoint
     */
    public String testConnection() {
        if (fromEmail == null || fromEmail.isBlank()) {
            return "SMTP not configured: no username set";
        }
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(notificationEmail);
            mail.setSubject("Test Email - Therapy By Rashi");
            mail.setText("This is a test email to verify SMTP configuration is working correctly.");
            mailSender.send(mail);
            return "SUCCESS: Test email sent to " + notificationEmail;
        } catch (Exception e) {
            return "FAILED: " + e.getMessage() + (e.getCause() != null ? " | Cause: " + e.getCause().getMessage() : "");
        }
    }
}
