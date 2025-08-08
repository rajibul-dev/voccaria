# Debug Logging Added for Production Troubleshooting

## Overview

Extensive logging has been added throughout the authentication and user fetching flow to help debug the JSON parsing issues in production.

## Logging Added

### Backend Logging

#### 1. User Controllers (`backend/src/controllers/userControllers.ts`)

- **`showMe` function**: Comprehensive logging of:
  - Request details (method, URL, headers)
  - Authentication status
  - User object inspection before and after sanitization
  - JSON serialization testing
  - Error handling with stack traces

#### 2. Sanitize User Helper (`backend/src/helpers/sanitizeUser.ts`)

- **`sanitizeUser` function**: Detailed logging of:
  - Input validation
  - Each user property being accessed
  - JSON serialization testing
  - Error handling with stack traces

#### 3. Authorization Middleware (`backend/src/middlewares/authorizeUserMiddleware.ts`)

- **`authorizeUser` function**: Logging of:
  - Request details
  - Session information
  - Authentication status
  - User object presence and basic info

#### 4. Passport Strategies

- **Local Strategy** (`backend/src/libs/passport/localStrategy.ts`):
  - Serialize/deserialize user logging
  - User database lookup results
  - User object inspection
- **Google Strategy** (`backend/src/libs/passport/googleStrategy.ts`):
  - Serialize/deserialize user logging
  - User database lookup results
  - User object inspection

### Frontend Logging

#### 1. API Proxy Route (`apps/web-frontend/src/app/api/[...path]/route.ts`)

- **GET handler**: Comprehensive logging of:
  - Original request details
  - Target URL construction
  - Request options
  - Backend response details
  - Response text inspection
  - Proxy response creation

#### 2. User Fetch Hook (`apps/web-frontend/src/app/_hooks/useAuth.tsx`)

- **`fetchCurrentUser` function**: Detailed logging of:
  - Request configuration
  - Response status and headers
  - Response text reading and parsing
  - JSON parsing errors
  - Error response handling

## Log Prefixes

- 🔍 = Debug/Info logs
- ✅ = Success logs
- ❌ = Error logs

## Search Patterns

To find specific issues in production logs, search for:

- `SHOWME:` - Issues in the main user endpoint
- `SANITIZE:` - Issues with user data sanitization
- `AUTH_MIDDLEWARE:` - Authentication/authorization issues
- `PASSPORT_SERIALIZE:` / `PASSPORT_DESERIALIZE:` - Session handling issues
- `PROXY_GET:` - Frontend proxy issues
- `FETCH_USER:` - Client-side fetch issues

## Expected Flow

1. Client requests `/api/users/me`
2. Frontend proxy logs the request and forwards to backend
3. Backend authorization middleware validates session
4. Passport deserializes user from session
5. `showMe` controller processes request
6. `sanitizeUser` cleans the user object
7. Response sent back through proxy
8. Client receives and parses JSON

Any break in this chain should now be clearly visible in the logs.
