# Environment setup (staff application webhook)

The staff application form sends submissions to Discord via a webhook. The webhook URL is **never** sent to the browser or shown in Inspect; it is only read on the server.

## Local development

1. **Create `.env.local`** in the **project root** (same folder as `package.json`).
2. Add one line (no quotes around the URL):
   ```env
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
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

On the host, set the environment variable in the dashboard (e.g. Vercel → Project → Settings → Environment Variables). Do **not** rely on `.env.local` in production; it is not deployed. The webhook URL is still only used on the server and never exposed in the browser.
