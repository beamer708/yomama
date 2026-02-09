# Domain & Restoration Note

## Restoration complete

The application has been restored to its state before the domain host issue. No application code, API routes, or env vars were changed; only troubleshooting-only additions were reverted.

**Reverted (removed):**
- `vercel.json` – redirect and HSTS added during troubleshooting (redirect, if needed, is configured in the hosting dashboard).
- `scripts/check-production.js` and the `check:production` npm script.
- Troubleshooting docs `PRODUCTION_ACCESS_FIX.md` and `DEPLOY_NOW.md`.

**Unchanged:** `next.config.js`, all app and API code, layout, env setup, and existing docs (README, ENV_SETUP, STAFF_APPLICATION_*, etc.).

---

## Domain, DNS, and SSL

Domain configuration is **not** in this repo. It is managed only in:

- **Hosting platform** (e.g. Vercel): project, domains, and (if used) www → non-www redirect.
- **Registrar DNS** (e.g. Namecheap): A and CNAME records pointing to the host.

Last known working setup for this site (for reference only; set in your host and registrar):

- **Primary URL:** `https://unityvault.space`
- **DNS:** A record for `@` to the host’s IP (e.g. 76.76.21.21 for Vercel); CNAME for `www` to the host’s CNAME target (e.g. `cname.vercel-dns.com`).
- **Redirect:** If you use non-www as primary, configure “Redirect www → non-www” in the hosting dashboard (e.g. Vercel → Domains → Edit www).
- **SSL:** Provided by the host; ensure the certificate covers the domain(s) you use and that Safari compatibility is confirmed.

---

## Verification checklist

After any domain or hosting change:

- [ ] **https://unityvault.space** loads in Safari, Chrome, and Firefox (desktop).
- [ ] **www** version behaves as before (redirects to non-www or loads the same site, per your setup).
- [ ] No SSL warnings and no redirect loops.
- [ ] Test in an incognito/private window; allow time for DNS/cache propagation if needed.

The site should behave exactly as before the domain issue: same URLs, behavior, and appearance.
