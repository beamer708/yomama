# Maintenance mode

Temporary lockdown: all routes (including API) are gated behind a maintenance page. Only users with the staff password can access the site.

## Enable maintenance mode

1. Set environment variables (in `.env.local` for local, or in your host’s dashboard for production):

   ```env
   NEXT_PUBLIC_MAINTENANCE_MODE=true
   MAINTENANCE_PASSWORD=your-secret-password
   ```

   Use `NEXT_PUBLIC_MAINTENANCE_MODE` so the Edge runtime (middleware) can read it. The password stays server-only.

2. Redeploy or restart the app so the new env is picked up.

Visitors will see the “Maintenance in Progress” page. Staff can open **Staff access**, enter the password, and then browse the site as normal (cookie valid for 24 hours).

## Disable maintenance mode

1. Remove or set to off:

   ```env
   NEXT_PUBLIC_MAINTENANCE_MODE=false
   ```

   Or delete the `NEXT_PUBLIC_MAINTENANCE_MODE` variable.

2. Redeploy or restart.

The site is immediately public again. No code or data changes; the maintenance gate is only active when `NEXT_PUBLIC_MAINTENANCE_MODE` is `true` or `1`.

## Environment variables

| Variable                        | Required when maintenance is on | Description                                                                 |
|---------------------------------|----------------------------------|-----------------------------------------------------------------------------|
| `NEXT_PUBLIC_MAINTENANCE_MODE`  | —                                | Set to `true` or `1` to enable the gate. Must be public so Edge middleware can read it. |
| `MAINTENANCE_PASSWORD`          | Yes                              | Password for staff access (server-only; cookie set in API route).          |

## Routes

- **`/maintenance`** – Public maintenance notice (no nav/footer). Includes link to status page and “Staff access”.
- **`/maintenance-auth`** – Staff login form. POST to `/api/maintenance-auth` sets an HTTP-only cookie; middleware then allows access to all routes.

All other routes and `/api/*` are blocked when `NEXT_PUBLIC_MAINTENANCE_MODE` is on unless the request has a valid auth cookie.
