# IGRA Education Portal

> Free educational content aggregated from Khan Academy, YouTube EDU, NCERT, Wikipedia, and Coursera. Built for Indian students. No login required.

## Stack

| Layer     | Tool         | Purpose                        |
|-----------|--------------|--------------------------------|
| Frontend  | Next.js 14   | UI, routing, server components |
| Database  | Supabase     | Content storage, RLS           |
| Hosting   | Railway      | Deploy via GitHub push         |
| CI/CD     | GitHub Actions | Lint + build on every PR     |

## Project structure

```
src/
├── app/
│   ├── api/content/route.ts   # Content API endpoint
│   ├── globals.css            # Design tokens + animations
│   ├── layout.tsx             # Root layout + fonts
│   └── page.tsx               # Homepage
├── components/
│   ├── cards/
│   │   ├── ContentCard.tsx    # Individual resource card
│   │   └── ContentGrid.tsx    # Card grid + empty state
│   ├── layout/
│   │   ├── Header.tsx         # Nav + search bar
│   │   ├── HeroSection.tsx    # Headline + source pills
│   │   └── Footer.tsx         # Footer links
│   └── ui/
│       └── FilterBar.tsx      # Subject + type filters
└── lib/
    ├── types.ts               # TypeScript interfaces
    ├── mockData.ts            # Sample content (replace with Supabase)
    └── supabase.ts            # Supabase client
```

## Setup

### 1. Clone and install

```bash
git clone https://github.com/your-username/igra-education.git
cd igra-education
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → paste contents of `supabase-schema.sql` → Run
3. Go to Project Settings → API → copy your URL and anon key

### 3. Configure environment

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to Railway

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select this repo
4. Add environment variables (same as `.env.local`) in Railway dashboard
5. Railway auto-deploys on every push to `main`

## Adding content

Add rows to the `content` table in your Supabase dashboard, or use the SQL editor:

```sql
insert into content (title, description, source, source_icon, type, subject, url, level, featured)
values ('Your Title', 'Description here', 'Khan Academy', '🎓', 'course', 'math', 'https://...', 'Beginner', false);
```

## Roadmap

- [ ] Connect live APIs (YouTube Data API, Wikipedia API)
- [ ] Railway cron job for daily content refresh
- [ ] Search suggestions / autocomplete
- [ ] Subject detail pages
- [ ] Add more categories: News, Food, Jobs
