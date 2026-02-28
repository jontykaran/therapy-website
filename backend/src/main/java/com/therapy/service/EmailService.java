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

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Async
    public void sendContactNotification(String name, String email, String phone, String message) {
        if (fromEmail == null || fromEmail.isBlank()) {
            log.warn("SMTP not configured - skipping email notification for contact from: {}", email);
            return;
        }

        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(notificationEmail);
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
                    """, name, email, phone != null ? phone : "Not provided", message));

            mailSender.send(mail);
            log.info("Contact notification email sent for: {}", email);
        } catch (Exception e) {
            log.error("Failed to send contact notification email: {}", e.getMessage());
        }
    }
}
