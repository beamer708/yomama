# Temporary site shutdown

When enabled, every route shows the same shutdown message. No password, no redirects, no content removed. Fully reversible.

## Enable shutdown

Set in `.env.local` or your host environment:

```env
NEXT_PUBLIC_SITE_SHUTDOWN=true
```

Restart the dev server or redeploy. All pages will show: **Website Temporarily Unavailable** with the status link and body text. Existing routes and files are unchanged; the root layout simply renders the notice instead of the app.

## Disable shutdown (re-enable the site)

Set:

```env
NEXT_PUBLIC_SITE_SHUTDOWN=false
```

Or remove `NEXT_PUBLIC_SITE_SHUTDOWN`. Restart or redeploy. The site returns to normal immediately.

## Behaviour

- **All routes** (/, /resources, /about, etc.) render the same full-page notice when the flag is on.
- **No redirects** – responses remain 200; SEO-safe.
- **No auth** – single message for everyone.
- **No code or data removed** – only a layout-level conditional; all pages and APIs remain in the codebase.
