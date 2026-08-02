import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Check SMTP config
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log("\n=== CONTACT FORM SUBMISSION ===");
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject || "New Contact Inquiry"}`);
      console.log(`Message: ${message}`);
      console.log("=== END CONTACT FORM ===\n");
      console.warn("SMTP not configured. Email logged to console only.");
      return NextResponse.json({ success: true, method: "console" });
    }

    // Send email via nodemailer
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send to admin
    await transporter.sendMail({
      from: `"SkyLogic Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `[SkyLogic Contact] ${subject || "New Inquiry"} — from ${name}`,
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #0ea5e9); padding: 32px 24px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: white;">New Contact Inquiry</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">via SkyLogic Portfolio Contact Form</p>
          </div>
          <div style="padding: 32px 24px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 80px;">From</td>
                <td style="padding: 8px 0; color: #f8fafc; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</td>
                <td style="padding: 8px 0; color: #f8fafc;">${subject || "N/A"}</td>
              </tr>
            </table>
            <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px;">
              <p style="margin: 0 0 8px; color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 24px; border-top: 1px solid #1e293b; text-align: center;">
            <p style="margin: 0; color: #475569; font-size: 11px;">SkyLogic — We Build From Scratch</p>
          </div>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"SkyLogic" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for contacting SkyLogic, ${name}!`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #0ea5e9); padding: 32px 24px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: white;">Thank You, ${name}!</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">We received your message</p>
          </div>
          <div style="padding: 32px 24px;">
            <p style="color: #e2e8f0; line-height: 1.6; margin: 0 0 16px;">
              We appreciate you reaching out to SkyLogic. Our team has received your inquiry and will get back to you within 1-2 business days.
            </p>
            <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
              <p style="margin: 0 0 4px; color: #94a3b8; font-size: 11px; text-transform: uppercase;">Your Message</p>
              <p style="margin: 0; color: #cbd5e1; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;">
              If your matter is urgent, please reach us directly via WhatsApp or email.
            </p>
          </div>
          <div style="padding: 16px 24px; border-top: 1px solid #1e293b; text-align: center;">
            <p style="margin: 0; color: #475569; font-size: 11px;">SkyLogic — We Build From Scratch</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, method: "smtp" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
