# Livion Interiors — Digital Platform

Premium residential interior design lead generation & management system for Livion Interiors, Hyderabad.

---

## Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | Next.js 14 (App Router)     |
| Styling   | Tailwind CSS                |
| Forms     | React Hook Form + Zod       |
| Database  | PostgreSQL                  |
| WhatsApp  | Meta WhatsApp Cloud API     |
| Email     | SendGrid                    |
| Hosting   | DigitalOcean / AWS Lightsail|

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page (/)
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Global styles + CSS vars
│   ├── dashboard/
│   │   └── page.tsx          # Lead management dashboard (/dashboard)
│   ├── estimator/
│   │   └── page.tsx          # Cost estimator placeholder (/estimator)
│   ├── thank-you/
│   │   └── page.tsx          # Post-submission page (/thank-you)
│   └── api/
│       └── leads/
│           ├── route.ts      # GET (list) + POST (create) leads
│           └── [id]/
│               └── route.ts  # PATCH (update status) + DELETE
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Sticky navigation
│   │   └── Footer.tsx        # Footer with CTAs
│   └── sections/
│       ├── HeroSection.tsx   # Hero with stats
│       ├── ServicesSection.tsx
│       ├── PortfolioSection.tsx
│       ├── ProcessSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── ContactSection.tsx
│       └── LeadForm.tsx      # Main lead capture form
├── lib/
│   ├── db.ts                 # PostgreSQL pool + query helper
│   ├── whatsapp.ts           # WhatsApp Cloud API integration
│   ├── email.ts              # SendGrid email integration
│   └── utils.ts              # Utility helpers
└── types/
    └── index.ts              # TypeScript types
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Fill in your values in .env.local
```

### 3. Set up PostgreSQL
```bash
# Create database
createdb livion_interiors

# Run schema
psql -d livion_interiors -f schema.sql
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages & Routes

| Route        | Description                        |
|--------------|------------------------------------|
| `/`          | Landing page — hero, services, form|
| `/dashboard` | Internal lead management CRM       |
| `/estimator` | Cost estimator (placeholder)       |
| `/thank-you` | Post-form submission page          |

## API Routes

| Method | Endpoint         | Description                    |
|--------|-----------------|--------------------------------|
| POST   | `/api/leads`    | Create a new lead              |
| GET    | `/api/leads`    | List all leads (with filters)  |
| PATCH  | `/api/leads/:id`| Update lead status/notes       |
| DELETE | `/api/leads/:id`| Delete a lead                  |

---

## Colour Palette

| Token          | Hex       | Usage                    |
|----------------|-----------|--------------------------|
| `cream-100`    | `#F9F8F6` | Page background           |
| `cream-200`    | `#EFE9E3` | Section backgrounds       |
| `cream-300`    | `#D9CFC7` | Borders, dividers         |
| `cream-400`    | `#C9B59C` | Accents, icons            |
| `charcoal`     | `#2C2825` | Primary text, dark bg     |
| `gold`         | `#B8956A` | Brand accent, CTAs        |

---

## WhatsApp Setup (Meta Cloud API)

1. Go to [developers.facebook.com](https://developers.facebook.com/)
2. Create an App → Add WhatsApp product
3. Get your **Phone Number ID** and generate a **Permanent Access Token**
4. Add to `.env.local`
5. The system sends:
   - A welcome message to the lead immediately on submission
   - An internal notification to the team WhatsApp number

---

## Deployment (DigitalOcean / Lightsail)

```bash
# On your VPS
npm run build
npm start

# Or use PM2
pm2 start npm --name "livion" -- start
pm2 save

# Nginx reverse proxy on port 3000
# Set up SSL via Certbot (Let's Encrypt)
```

---

## Phase Roadmap

| Phase | Status      | Features                                    |
|-------|-------------|---------------------------------------------|
| 1     | ✅ Complete  | Landing page, Lead form, WhatsApp, Email    |
| 2     | 🔜 Pending  | Cost Estimator integration (client's tool)  |
| 3     | 🔜 Pending  | Dashboard auth (JWT / NextAuth)             |
| 4     | 🔜 Future   | Instagram lead webhook, Analytics           |

---

## Important Notes

- Replace all `+91 XXXX XXX XXX` placeholders with actual phone numbers
- Add real portfolio images to `public/images/` and update the portfolio section
- Dashboard has **no auth in Phase 1** — add auth before going live
- WhatsApp messages to leads require the number to have **opted-in** per Meta policy
- WhatsApp message templates need approval from Meta before sending
