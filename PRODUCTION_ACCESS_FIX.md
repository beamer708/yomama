# Production Access Fix – Safari "Can't Connect to the Server"

## Diagnosis Summary (Completed)

| Check | Result |
|-------|--------|
| **DNS – www** | `www.unityvault.space` → `198.54.117.242` (resolves) |
| **DNS – root** | `unityvault.space` → `198.54.117.242` (resolves) |
| **HTTPS (443)** | **Connection refused** for both www and root |
| **HTTP (80)** | Returns 200 but serves **Namecheap parking page** (not your app) |
| **Hosting IP** | 198.54.117.242 = **Namecheap, Inc.** (AS22612) |

### Root Cause

1. **HTTPS is not working** – Port 443 is not accepting connections at `198.54.117.242`. Safari (and modern browsers) use HTTPS by default, so Safari shows "Safari Can't Connect to the Server" when HTTPS fails.
2. **Domain is on Namecheap parking** – HTTP returns a Namecheap placeholder (`Server: namecheap-web`, cookies for `www.namecheap.com`). The Unity Vault Next.js app is **not** being served at this IP.
3. **No SSL certificate active** – Even if the app were there, HTTPS would need a valid certificate covering both `unityvault.space` and `www.unityvault.space`.

So the issue is **hosting + SSL**, not DNS or Safari-specific behavior. Fixing it requires either:

- **Option A (Recommended):** Deploy the Next.js app to **Vercel** (or Netlify), then point DNS to that host and use their free SSL. This repo is ready for Vercel (see below).
- **Option B:** Host the app on Namecheap (e.g. cPanel) and enable SSL (install certificate, ensure port 443 is open and serving your app).

---

## Fix Plan (What You Need to Do)

### Option A: Deploy to Vercel (Recommended)

1. **Deploy this repo to Vercel**
   - Push the repo to GitHub (if not already).
   - In [Vercel](https://vercel.com): New Project → Import this repo → Deploy.
   - Vercel will assign a URL like `unity-vault-website-xxx.vercel.app`.

2. **Add custom domains in Vercel**
   - Project → **Settings → Domains**
   - Add: `unityvault.space`
   - Add: `www.unityvault.space`
   - Vercel will show the required DNS records (usually CNAME for both, or A for root).

3. **Update DNS at Namecheap**
   - **For root (`unityvault.space`):**
     - Either: **ALIAS** or **ANAME** → `cname.vercel-dns.com` (if your registrar supports it),
     - Or: **A** record → Vercel’s IP (Vercel dashboard shows it).
   - **For www:** **CNAME** `www` → `cname.vercel-dns.com` (or the value Vercel shows).
   - Remove or stop using the current A record pointing to `198.54.117.242` for the live site.

4. **SSL**
   - Vercel provisions a free certificate for both `unityvault.space` and `www.unityvault.space` once DNS points to Vercel. No extra steps.

5. **Redirect (included in this repo)**
   - This project includes `vercel.json` with a redirect so requests to `www.unityvault.space` are permanently redirected (308) to `https://unityvault.space`, preserving the path. HSTS is also set for all responses. You can instead configure the www → apex redirect in Vercel Dashboard → Domains → Edit (www) → "Redirect to" if you prefer.

6. **Verify**
   - Wait for DNS propagation (up to 48 hours, often minutes).
   - Test:
     - https://unityvault.space – loads in Safari, Chrome, Firefox, mobile.
     - https://www.unityvault.space – redirects to https://unityvault.space (or loads same site if you prefer).
   - No SSL warnings; no "Can't Connect" in Safari.

### Option B: Keep Hosting on Namecheap

If the app must stay on Namecheap (e.g. cPanel shared hosting):

1. **Upload and run the Next.js app** on the host (e.g. Node.js app or static export on the server).
2. **Enable SSL on the server:**
   - In cPanel: **Security → SSL/TLS → Manage SSL Sites**.
   - Install a certificate that covers both `unityvault.space` and `www.unityvault.space` (e.g. Let’s Encrypt with both in SAN).
3. **Ensure port 443** is open and the web server (e.g. Apache/Nginx) is configured to serve HTTPS for both hostnames.
4. **Point DNS** to this server (A record to the server IP) for both root and www, or CNAME www to the root hostname.
5. **Redirect** www → non-www (or vice versa) at the server or via .htaccess so one canonical URL is used.

---

## What Was Added in This Repo

- **`vercel.json`** – Redirects `www.unityvault.space` to `https://unityvault.space` and enforces HTTPS. Use this when you deploy to Vercel so both domains work and Safari (and all browsers) get a valid HTTPS response.

After you complete the DNS and hosting steps above, both **https://unityvault.space** and **https://www.unityvault.space** will load (or redirect) correctly in Safari, Chrome, Firefox, and mobile, with no connection errors.
