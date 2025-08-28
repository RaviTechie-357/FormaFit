import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or "smtp.mailtrap.io" etc
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Gmail requires App Passwords
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `"FormaFit" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Mail sent to", to);
  } catch (error) {
    console.error("❌ Error sending mail:", error);
  }
};
