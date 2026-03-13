const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const FROM_EMAIL      = process.env.FROM_EMAIL ?? "leads@livioninteriors.com";
const TEAM_EMAIL      = process.env.TEAM_EMAIL ?? "team@livioninteriors.com";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

async function sendEmail(payload: EmailPayload) {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: payload.to }] }],
      from: { email: FROM_EMAIL, name: "Livion Interiors" },
      subject: payload.subject,
      content: [
        { type: "text/plain", value: payload.text ?? payload.subject },
        { type: "text/html",  value: payload.html },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`SendGrid error: ${err}`);
  }
}

// ─── Lead acknowledgement to client ──────────────────────────────────────────
export async function sendLeadAcknowledgement(lead: {
  name: string;
  phone: string;
  projectLocation: string;
  flatSize: string;
  possessionDate: string;
  budgetRange: string;
  email?: string;
}) {
  if (!lead.email) return; // Skip if no email provided

  await sendEmail({
    to: lead.email,
    subject: "Thank you for contacting Livion Interiors!",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #F9F8F6; padding: 40px 32px; border: 1px solid #EFE9E3;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 28px; color: #2C2825; font-weight: 400; letter-spacing: -0.02em; margin: 0;">
            Livion Interiors
          </h1>
          <p style="color: #B8956A; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; margin: 8px 0 0;">
            Crafting Spaces, Creating Memories
          </p>
        </div>

        <div style="height: 1px; background: #D9CFC7; margin: 24px 0;"></div>

        <p style="color: #2C2825; font-size: 18px; margin-bottom: 16px;">Dear ${lead.name},</p>
        <p style="color: #4A4441; line-height: 1.7; margin-bottom: 24px;">
          Thank you for your interest in Livion Interiors. We have received your enquiry and our design consultant will get in touch with you shortly to discuss your project.
        </p>

        <div style="background: #EFE9E3; padding: 24px; border-left: 3px solid #C9B59C; margin-bottom: 24px;">
          <p style="color: #7A736E; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 16px;">Your Enquiry Summary</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #7A736E; font-size: 13px; width: 140px;">Location</td><td style="color: #2C2825; font-size: 13px;">${lead.projectLocation}</td></tr>
            <tr><td style="padding: 6px 0; color: #7A736E; font-size: 13px;">Flat Size</td><td style="color: #2C2825; font-size: 13px;">${lead.flatSize}</td></tr>
            <tr><td style="padding: 6px 0; color: #7A736E; font-size: 13px;">Possession</td><td style="color: #2C2825; font-size: 13px;">${lead.possessionDate}</td></tr>
            <tr><td style="padding: 6px 0; color: #7A736E; font-size: 13px;">Budget Range</td><td style="color: #2C2825; font-size: 13px;">${lead.budgetRange}</td></tr>
          </table>
        </div>

        <div style="height: 1px; background: #D9CFC7; margin: 24px 0;"></div>
        <p style="color: #7A736E; font-size: 12px; text-align: center;">
          Livion Interiors · Hyderabad · <a href="tel:+91XXXXXXXXXX" style="color: #B8956A;">+91 XXXXXXXXXX</a>
        </p>
      </div>
    `,
  });
}

// ─── Internal team notification ───────────────────────────────────────────────
export async function sendTeamLeadNotification(lead: {
  name: string;
  phone: string;
  projectLocation: string;
  flatSize: string;
  possessionDate: string;
  budgetRange: string;
}) {
  await sendEmail({
    to: TEAM_EMAIL,
    subject: `🔔 New Lead: ${lead.name} — ${lead.flatSize}, ${lead.projectLocation}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; background: #F9F8F6; padding: 32px; border: 1px solid #EFE9E3;">
        <h2 style="color: #2C2825; font-weight: 400; font-size: 22px; margin-bottom: 8px;">New Lead Received</h2>
        <p style="color: #B8956A; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 24px;">Livion Interiors CRM</p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #EFE9E3;"><td style="padding: 12px 0; color: #7A736E; width: 140px; font-size: 13px;">Name</td><td style="color: #2C2825; font-size: 13px; font-weight: 500;">${lead.name}</td></tr>
          <tr style="border-bottom: 1px solid #EFE9E3;"><td style="padding: 12px 0; color: #7A736E; font-size: 13px;">Phone</td><td style="color: #2C2825; font-size: 13px;"><a href="tel:+91${lead.phone}" style="color: #B8956A;">${lead.phone}</a></td></tr>
          <tr style="border-bottom: 1px solid #EFE9E3;"><td style="padding: 12px 0; color: #7A736E; font-size: 13px;">Location</td><td style="color: #2C2825; font-size: 13px;">${lead.projectLocation}</td></tr>
          <tr style="border-bottom: 1px solid #EFE9E3;"><td style="padding: 12px 0; color: #7A736E; font-size: 13px;">Flat Size</td><td style="color: #2C2825; font-size: 13px;">${lead.flatSize}</td></tr>
          <tr style="border-bottom: 1px solid #EFE9E3;"><td style="padding: 12px 0; color: #7A736E; font-size: 13px;">Possession</td><td style="color: #2C2825; font-size: 13px;">${lead.possessionDate}</td></tr>
          <tr><td style="padding: 12px 0; color: #7A736E; font-size: 13px;">Budget</td><td style="color: #2C2825; font-size: 13px;">${lead.budgetRange}</td></tr>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #EFE9E3;">
          <p style="color: #7A736E; font-size: 11px; margin: 0;">Lead received at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        </div>
      </div>
    `,
  });
}
