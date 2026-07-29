export async function sendOtpEmail(email: string, otp: string): Promise<boolean> {
  console.log(`\n==============================================`);
  console.log(`[SKYLOGIC AUTH] OTP generated for ${email}: ${otp}`);
  console.log(`[SKYLOGIC AUTH] Valid for 5 minutes.`);
  console.log(`==============================================\n`);

  // If Nodemailer SMTP env variables are provided, send actual email
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      // Dynamic import nodemailer if needed
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        // secure: Boolean(process.env.SMTP_SECURE),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"SkyLogic Security" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `[SkyLogic] Your Login OTP Code: ${otp}`,
        text: `Your 6-digit OTP code to access SkyLogic Admin Dashboard is: ${otp}. It will expire in 5 minutes.`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 8px;">
            <h2 style="color: #6366f1;">SkyLogic Security Verification</h2>
            <p>Use the following 6-digit code to log into the SkyLogic Admin Dashboard:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #38bdf8; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #94a3b8; font-size: 14px;">This OTP is valid for 5 minutes and can only be used once.</p>
          </div>
        `,
      });
      return true;
    } catch (err) {
      console.error("Failed to send SMTP email:", err);
      return false;
    }
  }

  return true;
}
