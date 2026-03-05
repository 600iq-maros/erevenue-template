# Klienti Dashboard Additions

Copy these files into the klienti.webzatyzden.sk codebase:

## 1. Prisma Schema
Add the models from `schema.prisma.example` to your existing `prisma/schema.prisma`.
Then run:
```bash
npx prisma migrate dev --name add-projects-and-leads
```

## 2. API Routes
- `api-projects-route.ts` → `app/api/projects/route.ts`
- `api-webhook-lead-route.ts` → `app/api/webhook/lead/route.ts`

## 3. Environment Variables
Add to klienti's `.env`:
```
ADMIN_API_KEY=generate_a_random_key_here
```

## 4. Usage
After deploying a new client site to Vercel, run:
```bash
KLIENTI_API_KEY=your_admin_key \
VERCEL_TOKEN=your_vercel_token \
VERCEL_TEAM_ID=your_team_id \
npx tsx scripts/setup-project.ts \
  --name "Client Name" \
  --domain "client.sk" \
  --vercel-project-id "prj_xxxx"
```

This will:
1. Create a project in klienti dashboard
2. Generate a webhook secret
3. Set WEBHOOK_URL, WEBHOOK_SECRET, PROJECT_ID on the Vercel project
4. Leads from the client site will now flow to the dashboard automatically
