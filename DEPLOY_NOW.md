# Site Still Not Working? Do These 3 Things

Right now **DNS still points to Namecheap** (198.54.117.242), where **HTTPS is off** and the app isn’t running. So the site will keep failing in Safari (and any browser using HTTPS) until you:

1. **Deploy this project to Vercel**
2. **Add your domain in Vercel**
3. **Point your domain at Vercel in Namecheap (change DNS)**

No code change can fix this from the repo alone; the domain must point to a host that serves HTTPS.

---

## Step 1: Deploy to Vercel (~2 min)

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in (GitHub is easiest).
2. **Import** this repo (e.g. `UnityLabWebsite` or your fork). If it’s not on GitHub, push it first, then import.
3. Click **Deploy** (leave all defaults). Wait until the deployment finishes.
4. You’ll get a URL like `unity-vault-website-xxxx.vercel.app`. Open it and confirm the site loads. **Do not change DNS yet.**

---

## Step 2: Add your domain in Vercel (~1 min)

1. In Vercel, open your **project** → **Settings** → **Domains**.
2. Click **Add** and add: **`unityvault.space`** → Add.
3. Click **Add** again and add: **`www.unityvault.space`** → Add.
4. For **www.unityvault.space**, click the three dots → **Edit** → set **Redirect to** → **unityvault.space** (so www redirects to non-www). Save.
5. On the Domains page, Vercel will show something like:
   - `unityvault.space` → use **A** record **76.76.21.21**
   - `www.unityvault.space` → use **CNAME** **cname.vercel-dns.com**  
   *(If Vercel shows different values, use exactly what it shows.)*

---

## Step 3: Point DNS at Vercel in Namecheap (~2 min)

1. Log in to **Namecheap** → **Domain List** → click **Manage** next to **unityvault.space**.
2. Open **Advanced DNS**.
3. **Remove or stop using** any record that points the domain to **198.54.117.242** (parking):
   - If you have **A Record** for **@** with value **198.54.117.242** → **Remove** or change it.
   - If you have **A Record** for **www** with value **198.54.117.242** → **Remove** or change it.
   - If you use “URL Redirect” or “Parking” for @ or www, **turn it off** or remove it so it doesn’t override the records below.
4. **Add the records Vercel needs:**
   - **A Record**  
     - Host: **@**  
     - Value: **76.76.21.21**  
     - TTL: Automatic (or 300).
   - **CNAME Record**  
     - Host: **www**  
     - Value: **cname.vercel-dns.com**  
     - TTL: Automatic (or 300).
5. **Save** and wait 5–30 minutes (sometimes up to an hour) for DNS to update.

---

## Step 4: Verify

- Open **https://unityvault.space** in Safari (and Chrome/Firefox). It should load with a lock icon and no errors.
- Open **https://www.unityvault.space**. It should redirect to **https://unityvault.space** and load the same site.

If it still fails:

- In Vercel → Domains, check that both domains show a green “Valid” (or similar) status. If they show “Invalid” or “Pending”, fix the DNS records to match what Vercel shows.
- Run the check script in this repo (see below) to see what DNS and HTTPS are doing.

---

## Quick check from your machine

From the project folder you can run:

```bash
# DNS: should show 76.76.21.21 for root and a CNAME for www (or 76.76.21.21 if CNAME resolved)
dig unityvault.space +short
dig www.unityvault.space +short

# HTTPS: should return headers and 200, not "Connection refused"
curl -sI https://unityvault.space
```

After Step 3, when DNS points to Vercel, `dig unityvault.space +short` should show **76.76.21.21** (not 198.54.117.242), and `curl -sI https://unityvault.space` should return HTTP headers and status 200.
