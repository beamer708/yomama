# Environment setup (staff application webhook)

The staff application form sends submissions to Discord via a webhook. The webhook URL is **never** sent to the browser or shown in Inspect; it is only read on the server.

## Local development

1. **Create `.env.local`** in the **project root** (same folder as `package.json`).
2. Add these variables (no quotes):
   ```env
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
   RESOURCE_SUGGESTION_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
   STAFF_APPLICATION_OPEN=false
   NEXT_PUBLIC_STAFF_APPLICATION_OPEN=false
   OPENAI_API_KEY=your_openai_api_key
   ADMIN_DASHBOARD_USERNAME=change_me
   ADMIN_DASHBOARD_PASSWORD=change_me
   ANALYTICS_SALT=change_me
   ```
3. **Restart the dev server** after creating or editing `.env.local`:
   - Stop the server (Ctrl+C or Cmd+C).
   - Run `npm run dev` again from the project root.

`.env.local` is in `.gitignore`, so it stays on your machine and is never committed. Next.js loads it automatically when the server starts; the webhook URL is only used in API routes and never exposed to the client.

## If it still says "not configured"

- Run `npm run dev` from the folder that contains `package.json` and `.env.local`.
- Confirm the file is named exactly `.env.local` and the variable is exactly `DISCORD_WEBHOOK_URL`.
- Restart the dev server after any change to `.env.local`.

## Production (e.g. Vercel, Netlify)

On the host, set environment variables in the dashboard (e.g. Vercel → Project → Settings → Environment Variables). Do **not** rely on `.env.local` in production; it is not deployed.

- `DISCORD_WEBHOOK_URL`: required for delivering applications to Discord
- `RESOURCE_SUGGESTION_WEBHOOK_URL`: required for delivering resource suggestions to Discord
- `STAFF_APPLICATION_OPEN`: server-side gate for API submissions (`true`/`false`)
- `NEXT_PUBLIC_STAFF_APPLICATION_OPEN`: client-side gate for page/header visibility (`true`/`false`)
- `OPENAI_API_KEY`: enables AI intent classification in the Resource Assistant
- `ADMIN_DASHBOARD_USERNAME`: HTTP Basic username for `/admin/*` and `/api/admin/*`
- `ADMIN_DASHBOARD_PASSWORD`: HTTP Basic password for `/admin/*` and `/api/admin/*`
- `ANALYTICS_SALT`: salt used to hash IP addresses for anonymous unique-visitor counts

Formatting note:
- Do not add leading spaces before variable names in `.env.local`

Use both open flags together and keep them in sync:
- `true` + `true`: application page open, header link visible, API accepts submissions
- `false` + `false`: application page closed, header link hidden, API returns closed/maintenance message
