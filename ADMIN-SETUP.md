# Admin panel + calculator: going live

This branch adds a database-backed admin panel (`/admin`), a public pricing
calculator (`/calculator`), and a lead-capture popup with A/B testing. None of
it is live in production yet because it needs a database, which this
environment cannot provision or reach on its own (see "Why I can't do this
part" below). Here's exactly what's needed.

## 1. Provision a Postgres database

Easiest path since the project is already on Vercel:

1. Vercel dashboard → your project → **Storage** tab → **Create Database** →
   choose a Postgres option (Neon is the built-in one).
2. Connect it to this project. Vercel will offer to add the env vars
   automatically — accept, or copy the connection string it gives you.
3. In **Project Settings → Environment Variables**, make sure these exist for
   the **Production** environment:
   - `DATABASE_URL` — the connection string from step 2
   - `SESSION_SECRET` — any random 32+ byte string (e.g. output of
     `openssl rand -hex 32`)
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — optional but recommended:
     set these to choose your own super-admin login instead of getting a
     random password printed in the build log (see step 3 below).

## 2. Redeploy

Once those env vars are set, trigger a redeploy (push any commit, or use
"Redeploy" in the Vercel dashboard). The build runs `vercel-build` (see
`package.json`), which automatically, in order:

1. Runs database migrations (creates all tables)
2. Seeds the catalog — the 10 categories and ~61 individual services from the
   list you gave me, an example bundle-discount rule (company registration +
   financial/management + payroll/insurance + digital/fintech = 10%), an
   example referral code (`REF5` = 5%), two popup A/B variants, and the
   super-admin account
3. Builds the site

This is all idempotent — redeploying again never duplicates data or resets
prices you've since edited in the admin panel.

## 3. Log in

- URL: `https://malibaan.com/admin/login`
- If you set `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` before the first
  deploy, use those.
- Otherwise, check the deployment's build logs (Vercel dashboard → the
  deployment → "Building" step) right after the first successful deploy — the
  seed script prints a one-time generated email/password there. Log in and
  note it down; there's no "forgot password" flow yet, so if you lose it,
  the fastest fix is to delete the admin account row via the database
  dashboard and redeploy to reseed a fresh one.

## 4. Everything else is admin-editable from there

- **خدمات و دسته‌بندی‌ها**: every service was seeded with a placeholder price
  of ۳,۰۰۰,۰۰۰ تومان — go through and set real prices (and add/remove
  services or whole categories) before pointing customers at `/calculator`.
- **تخفیف‌ها و کد معرف**: edit/add bundle rules and referral codes, and the
  overall max-discount cap.
- **پاپ‌آپ تماس**: edit both A/B variants' copy, delay, and traffic split.
- **لیدها**: every submission from the contact form, consultation form,
  calculator, and popup lands here.

## Why I can't do the provisioning/migration myself

Two separate walls, both confirmed by testing directly:

- This sandbox's network policy blocks direct calls to `api.vercel.com`
  entirely (hit this earlier when trying to deploy via the Vercel CLI too) —
  provisioning a database via API/CLI isn't possible from here regardless of
  which provider you pick.
- Even with a connection string in hand, this sandbox's egress proxy doesn't
  support raw TCP database connections at all (only HTTP/HTTPS) — so I
  couldn't run a migration against a remote Postgres host even if you pasted
  me the credentials directly.

That's why migrations/seeding are wired into the Vercel build step instead
(`vercel-build` in `package.json`) — Vercel's own build environment has real
network access and runs it automatically, so no manual database command is
needed from either of us.
