# Livion Interiors — Digital Platform

Premium residential interior design lead generation & admin management system for Livion Interiors, Hyderabad.

---

## Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | Next.js 14 (App Router)        |
| Styling    | Tailwind CSS                   |
| Database   | PostgreSQL via Supabase         |
| Images     | Cloudinary                     |
| Auth       | JWT (jose) + HTTP-only cookies |
| Email      | SendGrid                       |
| WhatsApp   | Meta WhatsApp Cloud API        |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page (/)
│   ├── layout.tsx                # Root layout + metadata
│   ├── globals.css               # Global styles + CSS variables
│   ├── admin/
│   │   ├── page.tsx              # Admin dashboard (/admin)
│   │   ├── login/page.tsx        # Admin login (/admin/login)
│   │   ├── reviews/page.tsx      # Reviews manager (/admin/reviews)
│   │   └── portfolio/page.tsx    # Portfolio manager (/admin/portfolio)
│   └── api/
│       ├── upload/route.ts       # POST — image upload to Cloudinary
│       ├── leads/
│       │   ├── route.ts          # GET + POST leads
│       │   └── [id]/route.ts     # PATCH + DELETE lead
│       └── admin/
│           ├── login/route.ts    # POST — admin login
│           ├── reviews/
│           │   ├── route.ts      # GET + POST reviews
│           │   └── [id]/route.ts # PATCH + DELETE review
│           └── portfolio/
│               ├── route.ts      # GET + POST portfolio projects
│               └── [id]/route.ts # PATCH + DELETE project
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FounderSection.tsx
│   │   └── ...
│   └── admin/
│       ├── AdminLayout.tsx
│       └── ImageUploader.tsx     # Drag & drop Cloudinary uploader
├── lib/
│   ├── db.ts                     # Supabase PostgreSQL pool + query helper
│   ├── auth.ts                   # JWT helpers
│   └── cloudinary.ts             # Cloudinary upload/delete helpers
└── middleware.ts                 # Admin route protection
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/livion-interiors.git
cd livion-interiors
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Fill in your actual values in .env
```

> Get the real `.env` values from the project owner.

### 4. Set up the database (Supabase)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and paste the entire contents of `schema.sql` and run it
3. Copy your connection string from **Settings → Database → Connection string → URI**
4. Paste it as `DATABASE_URL` in your `.env`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Admin Panel

| Route              | Description                        |
|--------------------|------------------------------------|
| `/admin/login`     | Admin login                        |
| `/admin`           | Dashboard — leads overview         |
| `/admin/reviews`   | Add / edit / hide client reviews   |
| `/admin/portfolio` | Add / edit / hide portfolio images |

**Default credentials** (change after first login):
- Username: `admin`
- Password: `livion@admin123`

To add more admin users, run in Supabase SQL Editor:

```bash
# 1. Generate bcrypt hash for the new password
node -e "const b=require('bcryptjs');b.hash('newpassword',10).then(h=>console.log(h))"

# 2. Insert in Supabase SQL Editor
INSERT INTO admin_users (username, password_hash) VALUES ('username', 'paste-hash-here');
```

---

## API Routes

| Method | Endpoint                    | Description                   |
|--------|-----------------------------|-------------------------------|
| POST   | `/api/leads`                | Submit a new lead             |
| GET    | `/api/leads`                | List all leads                |
| PATCH  | `/api/leads/:id`            | Update lead status/notes      |
| DELETE | `/api/leads/:id`            | Delete a lead                 |
| POST   | `/api/upload`               | Upload image to Cloudinary    |
| GET    | `/api/admin/reviews`        | List reviews                  |
| POST   | `/api/admin/reviews`        | Create review                 |
| PATCH  | `/api/admin/reviews/:id`    | Update review                 |
| DELETE | `/api/admin/reviews/:id`    | Delete review                 |
| GET    | `/api/admin/portfolio`      | List portfolio projects        |
| POST   | `/api/admin/portfolio`      | Create portfolio project       |
| PATCH  | `/api/admin/portfolio/:id`  | Update portfolio project       |
| DELETE | `/api/admin/portfolio/:id`  | Delete portfolio project       |

---

## Colour Palette

| Token       | Hex       | Usage                     |
|-------------|-----------|---------------------------|
| `cream-100` | `#F9F8F6` | Page background            |
| `cream-200` | `#EFE9E3` | Section backgrounds        |
| `cream-300` | `#D9CFC7` | Borders, dividers          |
| `gold`      | `#B8956A` | Brand accent, CTAs         |
| `charcoal`  | `#2C2825` | Primary text, dark bg      |

---

## Deployment

This project is ready to deploy on **Vercel** (recommended):

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example` in Vercel → Project Settings → Environment Variables
4. Deploy

For other platforms (Railway, Render, VPS), run:

```bash
npm run build
npm start
```
