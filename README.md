# BAZZARNA Website

BAZZARNA is now structured as a real `Next.js + TypeScript + Tailwind + Supabase` application instead of a static design dump. The existing showcase HTML remains in `stitch_elite_bazaar_showcase/` as visual reference, while the root of the repo now contains the live app foundation.

## What is included

- Public pages for:
  - homepage
  - events listing and event detail
  - brands listing and brand detail
  - sponsors listing and sponsor detail
  - talent application page
- Authentication flow:
  - email/password sign-in
  - Google sign-in
  - welcome email hook on signup
- Admin dashboard structure for:
  - events
  - brands
  - sponsors
  - media
  - talent review
  - users and roles
- API routes for:
  - notify me
  - talent application submission
  - talent accept/reject
  - content CRUD
  - user invites and role updates
  - 3-day reminder cron trigger
- Supabase schema and seed files under `supabase/`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Database, Storage
- Resend for transactional email

## Required environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
BAZZARNA_ADMIN_EMAIL=
CRON_SECRET=
```

## Setup

1. Install dependencies

```bash
npm install
```

2. Apply the schema in Supabase

- Run `supabase/migrations/202604280830_initial_schema.sql`
- Optionally run `supabase/seed.sql`

3. Start the app

```bash
npm run dev
```

4. Configure Google auth in Supabase

- Add your site URL in Supabase Auth
- Enable Google provider
- Set the redirect URL to:

```text
http://localhost:3000/api/auth/callback
```

5. Configure email

- Create a Resend API key
- Set `RESEND_FROM_EMAIL`
- Use `BAZZARNA_ADMIN_EMAIL` for talent application notifications

## Notes on permissions

- `main_admin`:
  - full CRUD
  - user, role, and permission management
  - stock preview editing
- `operations_staff`:
  - events, brands, sponsors, and media content management
  - talent review
  - no user management
  - no stock preview permission in the API layer

## Event reminders

The reminders endpoint is:

```text
POST /api/cron/event-reminders
```

Send the `x-cron-secret` header with the value from `CRON_SECRET`. This route looks for events starting exactly 3 days ahead and emails saved recipients.
