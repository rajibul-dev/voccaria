# Production Deployment Fix Guide

## Issues Identified and Solutions

### 1. Environment Variables Issues ❌

**Problem**: Production deployment is using localhost URLs which don't work in production.

**Solution**: Update Vercel environment variables:

#### Required Environment Variables for Vercel:

```bash
# Backend URLs - UPDATE THESE WITH YOUR ACTUAL BACKEND DOMAIN
EXPRESS_BACKEND_ORIGIN=https://your-backend-domain.com
NEXT_PUBLIC_EXPRESS_BACKEND_ORIGIN=https://your-backend-domain.com
NEXT_PUBLIC_FRONTEND_URL=https://dev.voccaria.com

# PayPal Production Credentials
PAYPAL_CLIENT_ID=AWlVsjH3FBAgYWGVKCzU_voA0e27xMcOTEqoGnU2967MUU_o1aiSpRWzBYIYRmdGW651kNba9Fwwxvq6
PAYPAL_CLIENT_SECRET=EA0xL-MkKok2t5hU4m1gRRcEVN3qc3g-ZcBmFV1z_jDP8lFKaR3jQ_VuZ9DVFnOPdVXXLf9qjsKJvh52

# Email Configuration
EMAIL_PASS=qmipvdvtbzabbtqd
EMAIL=rajibulski110@gmail.com

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=osw478n5
NEXT_PUBLIC_SANITY_DATASET=production

# Performance Settings
NEXT_PRIVATE_SKIP_SIZE_LIMIT=1
NEXT_PRIVATE_DEBUG_CACHE=false
```

### 2. Sanity CORS Issues ❌

**Problem**: Sanity is blocking requests from `https://dev.voccaria.com`

**Solution**: Add `https://dev.voccaria.com` to your Sanity project's CORS origins:

1. Go to https://sanity.io/manage
2. Select your project `voccaria` (osw478n5)
3. Go to Settings → API settings
4. Add `https://dev.voccaria.com` to the CORS origins list
5. Save the changes

### 3. JSON Parsing Errors ✅ Fixed

**Problem**: "Unterminated string in JSON" errors in API responses

**Solution**: Added better error handling in `useAuth.tsx` to handle malformed JSON responses gracefully.

### 4. Backend Authentication Issues ❌

**Problem**: Backend throwing "User not found" errors in Google OAuth flow

**Solution**: Check your backend Google OAuth configuration:

1. Ensure Google OAuth callback URLs include production domain
2. Verify database connection in production
3. Check backend environment variables for production

## Steps to Fix Production Deployment:

### Step 1: Update Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add/update all the environment variables listed above
4. **IMPORTANT**: Replace `https://your-backend-domain.com` with your actual backend URL

### Step 2: Fix Sanity CORS

1. Login to Sanity.io
2. Navigate to your project settings
3. Add production domain to CORS origins

### Step 3: Redeploy

1. Push the current changes to trigger a new deployment
2. Monitor the deployment logs for any remaining issues

### Step 4: Backend Configuration

Ensure your backend is configured for production:

- Database connection strings
- Google OAuth redirect URLs
- CORS settings
- Session/cookie configuration

## Files Modified:

- ✅ `apps/web-frontend/src/app/_hooks/useAuth.tsx` - Better JSON error handling
- ✅ `apps/web-frontend/vercel.json` - Added proper routing configuration
- ✅ `apps/web-frontend/.env.production` - Template for production environment variables

## Next Steps:

1. Update the environment variables in Vercel with your actual backend URL
2. Configure Sanity CORS settings
3. Verify backend production configuration
4. Redeploy and test
