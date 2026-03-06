// Vercel Serverless Function — Contact Form Handler
// Sends email via Resend HTTP API

const RESEND_API_URL = "https://api.resend.com/emails";

// Simple in-memory rate limiting (per function instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting by IP
  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] ||
    "unknown";

  if (isRateLimited(clientIp)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again in a minute." });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validation
    const errors = [];
    if (!name || !name.trim()) errors.push("Name is required");
    if (!email || !email.trim()) errors.push("Email is required");
    else if (!/^\S+@\S+\.\S+$/.test(email))
      errors.push("Invalid email address");
    if (!message || !message.trim()) errors.push("Message is required");

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const notificationEmail =
      process.env.NOTIFICATION_EMAIL ||
      "rashisharmapsychotherapy@outlook.com";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const htmlBody = buildHtmlEmail(name, email, phone, message);
    const textBody = buildTextEmail(name, email, phone, message);

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notificationEmail],
        reply_to: email,
        subject: `New Enquiry from ${name} — Therapy By Rashi`,
        html: htmlBody,
        text: textBody,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return res
        .status(500)
        .json({ error: "Failed to send message. Please try again." });
    }

    console.log("Email sent successfully:", resendData.id);

    return res
      .status(201)
      .json({ message: "Thank you for your message. We will be in touch soon." });
  } catch (err) {
    console.error("Contact function error:", err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
}

// ─── Rate Limiting ───────────────────────────────────────────────

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

// ─── Email Templates ─────────────────────────────────────────────

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtmlEmail(name, email, phone, message) {
  const timestamp = new Date().toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const phoneDisplay = phone && phone.trim() ? phone : "Not provided";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f6f7f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f7f4;padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#5A7A72 0%,#4b5a40 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <div style="margin-bottom:12px;">
                <span style="display:inline-block;width:40px;height:40px;background:linear-gradient(135deg,#8BA89F,#A8D5BA);border-radius:50%;line-height:40px;font-size:20px;">&#127807;</span>
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
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f7f4;border-radius:12px;border:1px solid #e8ebe3;margin-bottom:24px;">
                <tr>
                  <td style="padding:24px 28px;">

                    <!-- Name -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                      <tr>
                        <td width="28" valign="top" style="padding-top:2px;">
                          <span style="font-size:16px;">&#128100;</span>
                        </td>
                        <td style="padding-left:8px;">
                          <p style="margin:0;font-size:11px;color:#8BA89F;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Name</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#3d4935;font-weight:500;">${escapeHtml(name)}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Email -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                      <tr>
                        <td width="28" valign="top" style="padding-top:2px;">
                          <span style="font-size:16px;">&#9993;</span>
                        </td>
                        <td style="padding-left:8px;">
                          <p style="margin:0;font-size:11px;color:#8BA89F;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#3d4935;">
                            <a href="mailto:${escapeHtml(email)}" style="color:#5A7A72;text-decoration:none;font-weight:500;">${escapeHtml(email)}</a>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Phone -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="28" valign="top" style="padding-top:2px;">
                          <span style="font-size:16px;">&#128222;</span>
                        </td>
                        <td style="padding-left:8px;">
                          <p style="margin:0;font-size:11px;color:#8BA89F;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#3d4935;font-weight:500;">${escapeHtml(phoneDisplay)}</p>
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
                <p style="margin:0;font-size:14px;color:#4b5a40;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
              </div>

              <!-- Reply Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(email)}?subject=Re: Your enquiry — Therapy By Rashi"
                       style="display:inline-block;background:linear-gradient(135deg,#5A7A72 0%,#4b5a40 100%);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:14px;font-weight:600;letter-spacing:0.3px;">
                      Reply to ${escapeHtml(name)}
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
                Received on ${timestamp}
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
</html>`;
}

function buildTextEmail(name, email, phone, message) {
  const phoneDisplay = phone && phone.trim() ? phone : "Not provided";
  return `New Client Enquiry — Therapy By Rashi
=====================================

Hi Rashi,

You have a new enquiry from your website contact form:

Name:    ${name}
Email:   ${email}
Phone:   ${phoneDisplay}

Message:
--------
${message}
--------

Reply directly to this email to respond to ${name}.

—
This is an automated notification from your website.`;
}
