/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // DISCORD_WEBHOOK_URL is intentionally NOT listed here so it is never
  // exposed to the client. It is only read server-side from .env.local
  // (which is gitignored). Keep the webhook URL in .env.local only.
};

module.exports = nextConfig;
