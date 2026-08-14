import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendContactNotification({ name, email, subject, message }) {
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping contact notification email.');
    return;
  }
  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: subject ? `New inquiry: ${subject}` : `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (err) {
    console.error('Failed to send contact notification email:', err.message);
  }
}
