const WHATSAPP_API_URL = "https://graph.facebook.com/v19.0";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;
const ACCESS_TOKEN    = process.env.WHATSAPP_ACCESS_TOKEN!;

interface WhatsAppTextMessage {
  to: string;
  message: string;
}

// ─── Send a plain text WhatsApp message ───────────────────────────────────────
export async function sendWhatsAppText({ to, message }: WhatsAppTextMessage) {
  const phone = to.replace(/\D/g, "");
  const recipient = phone.startsWith("91") ? phone : `91${phone}`;

  const response = await fetch(
    `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "text",
        text: { preview_url: false, body: message },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

// ─── Auto-welcome message sent to new leads ───────────────────────────────────
export function buildWelcomeMessage(name: string): string {
  return `Hi ${name}! 👋

Thank you for contacting *Livion Interiors*.

We're excited to help you create your dream home! To get started, could you please share:

1️⃣ *Project Location* — Which area/locality?
2️⃣ *Flat Size* — 2BHK, 3BHK, Villa?
3️⃣ *Possession Date* — When do you plan to move in?

Our design consultant will reach out to you shortly with a personalised plan.

_Livion Interiors — Crafting Spaces, Creating Memories_ 🏡`;
}

// ─── Internal notification to Livion team ─────────────────────────────────────
export function buildTeamNotificationMessage(lead: {
  name: string;
  phone: string;
  projectLocation: string;
  flatSize: string;
  possessionDate: string;
  budgetRange: string;
}): string {
  return `🔔 *New Lead Alert — Livion Interiors*

👤 *Name:* ${lead.name}
📱 *Phone:* ${lead.phone}
📍 *Location:* ${lead.projectLocation}
🏠 *Flat Size:* ${lead.flatSize}
📅 *Possession:* ${lead.possessionDate}
💰 *Budget:* ${lead.budgetRange}

_Reply to this number to contact the lead directly._`;
}
