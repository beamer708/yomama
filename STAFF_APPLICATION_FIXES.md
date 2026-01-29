# Staff Application System - Fixes Applied

## Issues Fixed

### 1. **Improved Error Handling & Logging**
- Added comprehensive logging at every step of the request lifecycle
- Logs now include:
  - Client IP addresses
  - Request parsing status
  - Validation results
  - Rate limit status
  - Discord API responses (with error details)
  - Request duration timing

### 2. **Discord Webhook Error Detection**
- Now captures and logs Discord's response body on errors
- Handles specific Discord error codes:
  - **401**: Invalid or expired webhook token
  - **404**: Webhook not found (deleted)
  - **429**: Discord rate limit exceeded
  - **400**: Invalid request format
- Returns specific error messages instead of generic failures

### 3. **Field Value Length Validation**
- Discord has a 1024 character limit per embed field value
- Added `truncateForDiscord()` function to ensure values don't exceed limits
- Prevents Discord from rejecting embeds due to oversized fields

### 4. **Webhook URL Validation**
- Validates webhook URL exists before attempting to send
- Validates URL format (must start with `https://discord.com/api/webhooks/`)
- Provides clear error messages if webhook is misconfigured

### 5. **Enhanced Frontend Error Display**
- Shows specific error messages from the API
- Displays rate limit reset times
- Includes Discord error details in development mode for debugging

### 6. **Request Logging**
- All requests are logged with timestamps
- Includes sanitized data (no sensitive info in logs)
- Helps identify where failures occur

## Testing the Fix

### Step 1: Verify Webhook Configuration

Check if the webhook is properly configured:

```bash
# In development, visit:
http://localhost:3000/api/staff-application/health

# Should return:
{
  "status": "ok",
  "message": "Webhook is configured",
  "configured": true,
  "webhookId": "1466219581650501638"
}
```

### Step 2: Check Server Logs

When you submit the form, check your terminal/console for detailed logs:

```
[Staff Application API] Received request from IP: ::1
[Staff Application API] Rate limit check passed. Remaining: 2
[Staff Application API] Parsed request body: { discordUsername: 'TestUser...', ... }
[Staff Application API] Validation passed, sending to Discord...
[Staff Application API] Sending application to Discord webhook (ID: 1466219581650501638)
[Staff Application API] Successfully sent application to Discord
[Staff Application API] Successfully processed application in 234ms
```

### Step 3: Test Form Submission

1. Navigate to `/staff-application`
2. Fill out the form:
   - Discord Username: `TestUser#1234`
   - Discord ID: `123456789012345678` (17-19 digits)
   - Past Experience: `I have experience with ERLC communities...` (at least 10 characters)
3. Submit the form
4. Check:
   - **Success**: You should see a green success message
   - **Discord**: Check your Discord channel (ID: 1466217442954186931) for the embed
   - **Logs**: Check terminal for detailed request logs

### Step 4: Test Error Cases

**Rate Limiting:**
- Submit 3 applications quickly
- 4th submission should show rate limit error with reset time

**Validation Errors:**
- Submit with empty fields → Should show field-specific errors
- Submit with invalid Discord ID → Should show validation error

**Discord Errors:**
- If webhook is invalid, you'll see specific error messages
- Check server logs for detailed Discord API responses

## Common Issues & Solutions

### Issue: "Server configuration error: Discord webhook URL not configured"

**Solution:**
1. Check `.env.local` file exists in project root
2. Verify `DISCORD_WEBHOOK_URL` is set
3. Restart your development server (`npm run dev`)

### Issue: "Discord webhook authentication failed"

**Solution:**
1. The webhook URL may be invalid or expired
2. Go to Discord → Server Settings → Integrations → Webhooks
3. Check if the webhook still exists
4. Create a new webhook if needed
5. Update `.env.local` with the new URL
6. Restart server

### Issue: "Discord webhook not found"

**Solution:**
- The webhook was deleted from Discord
- Create a new webhook and update `.env.local`

### Issue: Form submits but no message in Discord

**Check:**
1. Server logs for Discord API errors
2. Webhook channel permissions
3. Webhook is pointing to correct channel (ID: 1466217442954186931)

## Debugging Tips

1. **Check Environment Variable:**
   ```bash
   # In your terminal, verify the variable is loaded:
   node -e "console.log(process.env.DISCORD_WEBHOOK_URL)"
   ```

2. **Test Webhook Directly:**
   ```bash
   curl -X POST "YOUR_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{"embeds":[{"title":"Test","description":"Testing webhook"}]}'
   ```

3. **Monitor Server Logs:**
   - All requests are logged with `[Staff Application API]` prefix
   - Look for error messages and Discord responses

4. **Check Discord Channel:**
   - Verify webhook has permission to post in the channel
   - Check channel ID matches: `1466217442954186931`

## Production Deployment

When deploying to production:

1. **Set Environment Variable:**
   - Add `DISCORD_WEBHOOK_URL` to your hosting platform's environment variables
   - Never commit `.env.local` to git

2. **Test Health Endpoint:**
   - Visit `/api/staff-application/health` after deployment
   - Should return `{"status": "ok", "configured": true}`

3. **Monitor Logs:**
   - Check production logs for any Discord API errors
   - Set up error monitoring/alerts if available

## Summary

The system now has:
- ✅ Comprehensive error logging
- ✅ Specific error messages for different failure types
- ✅ Discord field length validation
- ✅ Webhook URL validation
- ✅ Detailed request logging
- ✅ Better frontend error display
- ✅ Health check endpoint for debugging

All errors are now logged with context, making it easy to identify and fix issues.
