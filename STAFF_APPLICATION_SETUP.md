# Staff Application System Setup Guide

This guide walks you through setting up the Discord webhook integration for the Unity Vault staff application system.

## Overview

The staff application form allows users to submit applications that are automatically sent to a private Discord channel for review. All submissions are protected by rate limiting to prevent spam.

## Discord Webhook Setup

### Step 1: Access Discord Server Settings

1. Open the Unity Vault Discord server (Server ID: `1251469666787000343`)
2. Right-click on the server name in the left sidebar
3. Select **Server Settings** from the context menu

### Step 2: Navigate to Webhooks

1. In Server Settings, click on **Integrations** in the left sidebar
2. Click on **Webhooks** in the submenu
3. You should see a list of existing webhooks (if any)

### Step 3: Create New Webhook

1. Click the **New Webhook** or **Create Webhook** button
2. A webhook configuration window will appear

### Step 4: Configure Webhook

1. **Name**: Enter a descriptive name like `Unity Vault Applications`
2. **Channel**: Click the channel dropdown and select the staff review channel
   - Channel ID: `1466217442954186931`
   - This is the channel where applications will be posted
3. **Avatar** (optional): You can upload a custom avatar for the webhook
4. Click **Copy Webhook URL** or manually copy the webhook URL
   - The URL will look like: `https://discord.com/api/webhooks/1234567890123456789/abcdefghijklmnopqrstuvwxyz1234567890`

### Step 5: Store Webhook URL Securely

1. Create a `.env.local` file in the project root directory (if it doesn't exist)
2. Copy the `.env.example` file and rename it to `.env.local`
3. Open `.env.local` and replace the placeholder with your actual webhook URL:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ACTUAL_WEBHOOK_ID/YOUR_ACTUAL_WEBHOOK_TOKEN
```

4. Save the file
5. **Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

### Step 6: Restart Development Server

1. Stop your current development server (Ctrl+C)
2. Start it again with `npm run dev`
3. The webhook URL will now be loaded from the environment variable

## Testing the System

### Test the Form

1. Navigate to `/staff-application` on your website
2. Fill out the form with test data:
   - Discord Username: `TestUser#1234`
   - Discord ID: `123456789012345678` (17-19 digits)
   - Past Experience: `Test application submission`
3. Submit the form
4. Check the Discord channel - you should see an embed with the application details

### Verify Rate Limiting

1. Submit 3 applications quickly from the same IP
2. The 4th submission should be blocked with a "Too many requests" error
3. Wait 15 minutes and try again - it should work

## Security Features

- **Rate Limiting**: Maximum 3 submissions per 15 minutes per IP address
- **Input Validation**: All fields are validated and sanitized
- **Server-Side Only**: Webhook URL never exposed to frontend
- **HTTPS Required**: Webhook requests use HTTPS
- **Input Sanitization**: Prevents injection attacks

## Troubleshooting

### Applications Not Appearing in Discord

1. **Check Environment Variable**:
   - Verify `.env.local` exists and contains `DISCORD_WEBHOOK_URL`
   - Make sure there are no extra spaces or quotes around the URL
   - Restart your development server

2. **Check Webhook URL**:
   - Verify the webhook URL is correct
   - Make sure you copied the entire URL including the token

3. **Check Discord Channel**:
   - Verify the webhook is pointing to the correct channel
   - Check if the webhook has permission to post in that channel

4. **Check Server Logs**:
   - Look for error messages in your terminal/console
   - Common errors:
     - `DISCORD_WEBHOOK_URL environment variable is not set` - Environment variable not loaded
     - `Discord webhook error: 404` - Invalid webhook URL
     - `Discord webhook error: 403` - Webhook doesn't have permission

### Rate Limiting Issues

- Rate limits reset after 15 minutes
- Each IP address has its own limit
- If testing multiple times, wait 15 minutes between test batches or use different IP addresses

### Form Validation Errors

- **Discord Username**: Must be 1-100 characters, cannot be empty
- **Discord ID**: Must be exactly 17-19 digits (numbers only)
- **Past Experience**: Must be 10-2000 characters

## Production Deployment

### Environment Variables

When deploying to production (Vercel, Netlify, etc.):

1. Go to your hosting platform's environment variables settings
2. Add `DISCORD_WEBHOOK_URL` with your webhook URL
3. Redeploy your application

### Vercel Example

1. Go to your project settings on Vercel
2. Navigate to **Environment Variables**
3. Add:
   - **Name**: `DISCORD_WEBHOOK_URL`
   - **Value**: Your webhook URL
   - **Environment**: Production (and Preview if needed)
4. Redeploy

## API Endpoint

The staff application API endpoint is:

- **URL**: `/api/staff-application`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Body

```json
{
  "discordUsername": "string (required, 1-100 chars)",
  "discordId": "string (required, 17-19 digits)",
  "pastExperience": "string (required, 10-2000 chars)"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Application submitted successfully"
}
```

### Error Responses

**Validation Error (400)**:
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": ["Discord Username is required", "Discord ID must be a valid 17-19 digit number"]
}
```

**Rate Limit Error (429)**:
```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "resetTime": "2024-01-01T12:00:00.000Z"
}
```

**Server Error (500)**:
```json
{
  "success": false,
  "error": "Failed to submit application. Please try again later."
}
```

## Maintenance

### Updating Rate Limits

Edit `/lib/rateLimit.ts`:
- `maxRequests`: Maximum submissions per window (default: 3)
- `windowMs`: Time window in milliseconds (default: 15 minutes)

### Changing Discord Channel

1. Create a new webhook pointing to the new channel
2. Update `DISCORD_WEBHOOK_URL` in `.env.local`
3. Restart the server

### Monitoring

Check your Discord channel regularly for new applications. Consider setting up Discord notifications for the channel.

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Verify environment variables are set correctly
4. Test the webhook URL directly using a tool like Postman or curl
