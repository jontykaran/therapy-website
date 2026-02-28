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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
            String htmlBody = buildContactNotificationHtml(name, email, phone, message);
            String plainText = buildContactNotificationText(name, email, phone, message);

            String jsonPayload = String.format("""
                    {
                      "from": "%s",
                      "to": ["%s"],
                      "reply_to": "%s",
                      "subject": "New Enquiry from %s — Therapy By Rashi",
                      "html": %s,
                      "text": %s
                    }
                    """,
                    escapeJson(fromEmail),
                    escapeJson(notificationEmail),
                    escapeJson(email),
                    escapeJson(name),
                    toJsonString(htmlBody),
                    toJsonString(plainText));

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
            String testHtml = buildTestEmailHtml();

            String jsonPayload = String.format("""
                    {
                      "from": "%s",
                      "to": ["%s"],
                      "subject": "Test Email — Therapy By Rashi",
                      "html": %s,
                      "text": "This is a test email to verify the email configuration for Therapy By Rashi is working correctly."
                    }
                    """,
                    escapeJson(fromEmail),
                    escapeJson(notificationEmail),
                    toJsonString(testHtml));

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

    // ─── HTML Email Templates ───────────────────────────────────────

    private String buildContactNotificationHtml(String name, String email, String phone, String message) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM d, yyyy 'at' h:mm a"));
        String phoneDisplay = (phone != null && !phone.isBlank()) ? phone : "Not provided";

        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0;padding:0;background-color:#f6f7f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
                  <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="background-color:#f6f7f4;padding:30px 15px;">
                    <tr>
                      <td align="center">
                        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%%;">

                          <!-- Header -->
                          <tr>
                            <td style="background:linear-gradient(135deg,#5A7A72 0%%,#4b5a40 100%%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
                              <!-- Leaf Icon -->
                              <div style="margin-bottom:12px;">
                                <span style="display:inline-block;width:40px;height:40px;background:linear-gradient(135deg,#8BA89F,#A8D5BA);border-radius:50%%;line-height:40px;font-size:20px;">&#127807;</span>
                              </div>
                              <h1 style="margin:0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:0.5px;">Therapy By Rashi</h1>
                              <p style="margin:6px 0 0;font-size:11px;color:#A8D5BA;text-transform:uppercase;letter-spacing:2px;">Person-Centred Therapy</p>
                            </td>
                          </tr>

                          <!-- New Enquiry Banner -->
                          <tr>
                            <td style="background-color:#A8D5BA;padding:14px 40px;text-align:center;">
                              <p style="margin:0;font-size:14px;font-weight:600;color:#3d4935;letter-spacing:0.5px;">
                                &#9993; &nbsp; New Client Enquiry Received
                              </p>
                            </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                            <td style="background-color:#ffffff;padding:36px 40px;">

                              <!-- Greeting -->
                              <p style="margin:0 0 20px;font-size:15px;color:#4b5a40;line-height:1.6;">
                                Hi Rashi,<br/>
                                You have a new enquiry from your website contact form:
                              </p>

                              <!-- Contact Details Card -->
                              <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="background-color:#f6f7f4;border-radius:12px;border:1px solid #e8ebe3;margin-bottom:24px;">
                                <tr>
                                  <td style="padding:24px 28px;">

                                    <!-- Name -->
                                    <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                                      <tr>
                                        <td width="28" valign="top" style="padding-top:2px;">
                                          <span style="font-size:16px;">&#128100;</span>
                                        </td>
                                        <td style="padding-left:8px;">
                                          <p style="margin:0;font-size:11px;color:#8BA89F;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Name</p>
                                          <p style="margin:4px 0 0;font-size:15px;color:#3d4935;font-weight:500;">%s</p>
                                        </td>
                                      </tr>
                                    </table>

                                    <!-- Email -->
                                    <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                                      <tr>
                                        <td width="28" valign="top" style="padding-top:2px;">
                                          <span style="font-size:16px;">&#9993;</span>
                                        </td>
                                        <td style="padding-left:8px;">
                                          <p style="margin:0;font-size:11px;color:#8BA89F;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</p>
                                          <p style="margin:4px 0 0;font-size:15px;color:#3d4935;">
                                            <a href="mailto:%s" style="color:#5A7A72;text-decoration:none;font-weight:500;">%s</a>
                                          </p>
                                        </td>
                                      </tr>
                                    </table>

                                    <!-- Phone -->
                                    <table role="presentation" width="100%%" cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td width="28" valign="top" style="padding-top:2px;">
                                          <span style="font-size:16px;">&#128222;</span>
                                        </td>
                                        <td style="padding-left:8px;">
                                          <p style="margin:0;font-size:11px;color:#8BA89F;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</p>
                                          <p style="margin:4px 0 0;font-size:15px;color:#3d4935;font-weight:500;">%s</p>
                                        </td>
                                      </tr>
                                    </table>

                                  </td>
                                </tr>
                              </table>

                              <!-- Message -->
                              <p style="margin:0 0 10px;font-size:11px;color:#8BA89F;text-transform:uppercase;letter-spacing:1px;font-weight:600;">
                                &#128172; &nbsp; Message
                              </p>
                              <div style="background-color:#fdf8f0;border-left:4px solid #D4A574;border-radius:0 8px 8px 0;padding:20px 24px;margin-bottom:28px;">
                                <p style="margin:0;font-size:14px;color:#4b5a40;line-height:1.7;white-space:pre-wrap;">%s</p>
                              </div>

                              <!-- Reply Button -->
                              <table role="presentation" width="100%%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td align="center">
                                    <a href="mailto:%s?subject=Re: Your enquiry — Therapy By Rashi"
                                       style="display:inline-block;background:linear-gradient(135deg,#5A7A72 0%%,#4b5a40 100%%);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:14px;font-weight:600;letter-spacing:0.3px;">
                                      Reply to %s
                                    </a>
                                  </td>
                                </tr>
                              </table>

                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td style="background-color:#f0f2ec;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #e8ebe3;">
                              <p style="margin:0 0 4px;font-size:12px;color:#8BA89F;">
                                Received on %s
                              </p>
                              <p style="margin:0;font-size:11px;color:#b3bea3;">
                                This is an automated notification from your website contact form.
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(
                escapeHtml(name),
                escapeHtml(email), escapeHtml(email),
                escapeHtml(phoneDisplay),
                escapeHtml(message),
                escapeHtml(email), escapeHtml(name),
                timestamp
        );
    }

    private String buildContactNotificationText(String name, String email, String phone, String message) {
        String phoneDisplay = (phone != null && !phone.isBlank()) ? phone : "Not provided";
        return String.format("""
                New Client Enquiry — Therapy By Rashi
                =====================================

                Hi Rashi,

                You have a new enquiry from your website contact form:

                Name:    %s
                Email:   %s
                Phone:   %s

                Message:
                --------
                %s
                --------

                Reply directly to this email to respond to %s.

                —
                This is an automated notification from your website.
                """, name, email, phoneDisplay, message, name);
    }

    private String buildTestEmailHtml() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM d, yyyy 'at' h:mm a"));

        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0;padding:0;background-color:#f6f7f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
                  <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="background-color:#f6f7f4;padding:30px 15px;">
                    <tr>
                      <td align="center">
                        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%%;">

                          <!-- Header -->
                          <tr>
                            <td style="background:linear-gradient(135deg,#5A7A72 0%%,#4b5a40 100%%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
                              <div style="margin-bottom:12px;">
                                <span style="display:inline-block;width:40px;height:40px;background:linear-gradient(135deg,#8BA89F,#A8D5BA);border-radius:50%%;line-height:40px;font-size:20px;">&#127807;</span>
                              </div>
                              <h1 style="margin:0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:0.5px;">Therapy By Rashi</h1>
                              <p style="margin:6px 0 0;font-size:11px;color:#A8D5BA;text-transform:uppercase;letter-spacing:2px;">Person-Centred Therapy</p>
                            </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                            <td style="background-color:#ffffff;padding:36px 40px;text-align:center;">
                              <div style="margin-bottom:20px;">
                                <span style="display:inline-block;width:56px;height:56px;background-color:#A8D5BA;border-radius:50%%;line-height:56px;font-size:28px;">&#10003;</span>
                              </div>
                              <h2 style="margin:0 0 12px;font-size:20px;color:#3d4935;font-weight:600;">Email Configuration Working</h2>
                              <p style="margin:0 0 8px;font-size:14px;color:#5f7150;line-height:1.6;">
                                Your email notifications are set up correctly.<br/>
                                Contact form submissions will be delivered to this inbox.
                              </p>
                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td style="background-color:#f0f2ec;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #e8ebe3;">
                              <p style="margin:0 0 4px;font-size:12px;color:#8BA89F;">
                                Test sent on %s
                              </p>
                              <p style="margin:0;font-size:11px;color:#b3bea3;">
                                Therapy By Rashi — Automated Notification System
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(timestamp);
    }

    // ─── Utility Methods ────────────────────────────────────────────

    /** Escape special JSON characters */
    private String escapeJson(String value) {
        if (value == null) return "";
        return value.replace("\\", "\\\\")
                     .replace("\"", "\\\"")
                     .replace("\n", "\\n")
                     .replace("\r", "\\r")
                     .replace("\t", "\\t");
    }

    /** Convert a string to a JSON string literal (with quotes and escaping) */
    private String toJsonString(String value) {
        return "\"" + escapeJson(value) + "\"";
    }

    /** Escape HTML special characters to prevent XSS in email content */
    private String escapeHtml(String value) {
        if (value == null) return "";
        return value.replace("&", "&amp;")
                     .replace("<", "&lt;")
                     .replace(">", "&gt;")
                     .replace("\"", "&quot;")
                     .replace("'", "&#39;");
    }
}
