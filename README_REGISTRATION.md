# HackaMined Registration System - Documentation

## Overview

This documentation covers the registration features integrated into the HackaMined frontend. The system provides Google OAuth authentication, individual registration, team management, and seamless integration with the deployed backend API.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://backend-tan-nine-50.vercel.app/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=998883045359-9gfhik7s6bg2rrl84csgfu7cdcdc6hbh.apps.googleusercontent.com
```

### Environment Variables Explained

- **NEXT_PUBLIC_API_BASE_URL**: The base URL of the deployed backend API. All API calls are made directly to this URL (no proxies or rewrites).
- **NEXT_PUBLIC_GOOGLE_CLIENT_ID**: Google OAuth 2.0 Client ID for web applications. Used for Google Sign-In functionality.

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend already deployed and running at the configured URL

### Setup Instructions

1. **Clone and navigate to the project:**
   ```bash
   cd /home/luv/hackamined/hackamined-clean
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with actual values
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to `http://localhost:3000`

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (existing)
- **HTTP Client**: Axios
- **Authentication**: @react-oauth/google
- **State Management**: Zustand (auth state)

### Backend Integration

The frontend communicates **directly** with the backend API at `https://backend-tan-nine-50.vercel.app/api`. Key points:

- ✅ **Direct API calls** (no Next.js API routes or proxies)
- ✅ **JWT authentication** via `Authorization: Bearer <token>` header
- ✅ **Stored in localStorage** for persistence across page refreshes
- ✅ **Automatic token injection** via Axios interceptors
- ✅ **Error handling** for 401, 403, 429, and 5xx responses

### Directory Structure

```
hackamined-clean/
├── app/
│   ├── login/page.tsx          # Google Sign-In page
│   ├── register/page.tsx       # Individual registration form
│   ├── dashboard/page.tsx      # User dashboard
│   └── team/
│       ├── create/page.tsx     # Team creation
│       └── [teamId]/page.tsx   # Team management
├── components/
│   ├── auth/
│   │   └── GoogleSignIn.tsx    # Google OAuth component
│   ├── forms/
│   │   └── RegistrationForm.tsx
│   ├── dashboard/
│   │   ├── UserProfile.tsx
│   │   └── TeamStatus.tsx
│   └── team/
│       ├── TeamCard.tsx
│       ├── InviteForm.tsx
│       └── MemberList.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts           # Axios instance with interceptors
│   │   ├── auth.ts             # POST /auth/google
│   │   ├── user.ts             # User API methods
│   │   ├── team.ts             # Team API methods
│   │   └── invitations.ts      # Invitation API methods
│   ├── auth/
│   │   └── token.ts            # JWT token management
│   ├── stores/
│   │   └── authStore.ts        # Zustand auth store
│   └── utils/
│       ├── errors.ts           # Error handling
│       └── validation.ts       # Form validation
└── types/
    └── index.ts                # TypeScript interfaces
```

## User Flows

### 1. Google Sign-In Flow

1. User navigates to `/login`
2. Clicks "Sign in with Google"
3. Google OAuth modal appears
4. User authenticates with Google
5. Frontend receives `idToken` from Google
6. **API Call**: `POST /api/auth/google` with `{ idToken }`
7. Backend responds with `{ token, user }`
8. JWT token stored in localStorage
9. User redirected based on `registrationStatus`:
   - `PENDING` → `/register`
   - `REGISTERED` → `/dashboard`

### 2. Individual Registration Flow

1. User lands on `/register` (protected route)
2. Fills in registration form with:
   - Personal: Full Name, Phone, WhatsApp
   - Education: College, Degree, Branch, Graduation Year
   - Location: City, State, Country
   - Social: GitHub, LinkedIn, Portfolio (optional)
3. Client-side validation runs
4. **API Call**: `POST /api/register/individual` with form data
5. If user has pending team invitation, auto-joins team
6. Redirect to `/dashboard`

### 3. Dashboard

1. User navigates to `/dashboard` (protected route)
2. **API Calls**:
   - `GET /api/user/me` - Fetch user profile
   - `GET /api/team/[id]` - Fetch team data (if user has teamId)
   - `GET /api/invitations` - Fetch pending invitations
3. Displays:
   - User profile information
   - Team status (or "Create Team" option)
   - Pending team invitations

### 4. Team Creation

1. User clicks "Create Team" from dashboard
2. Navigates to `/team/create`
3. Enters team name (min 3 characters)
4. **API Call**: `POST /api/team/create` with `{ name }`
5. Redirect to `/team/[teamId]`

### 5. Team Management

1. User navigates to `/team/[teamId]`
2. **API Call**: `GET /api/team/[id]` - Fetch team details
3. Displays:
   - Team name and status
   - Member list (max 4)
   - Leader badge
4. **Leader Actions** (if user is leader and team status is OPEN):
   - **Invite Member**: Enter email → `POST /api/team/invite`
   - **Remove Member**: Click remove → Confirm → `POST /api/team/remove-member`
5. **Deadline Enforcement**:
   - If deadline passed or team locked, show warning
   - Disable invite/remove buttons
   - Backend returns 403 for edit attempts

## API Endpoints Used

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/auth/google` | POST | Login with Google ID token | No |
| `/register/individual` | POST | Complete registration | Yes |
| `/user/me` | GET | Get user profile | Yes |
| `/user/status` | GET | Get registration status | Yes |
| `/team/create` | POST | Create new team | Yes |
| `/team/[id]` | GET | Get team details | Yes |
| `/team/invite` | POST | Invite team member | Yes (Leader) |
| `/team/remove-member` | POST | Remove team member | Yes (Leader) |
| `/invitations` | GET | Get user's invitations | Yes |

## Error Handling

### HTTP Status Codes

- **401 Unauthorized**: JWT expired or invalid → Clear token → Redirect to `/`
- **403 Forbidden**: Permission denied or deadline passed → Show error message
- **429 Rate Limit**: Too many requests → Show "Try again later" message
- **5xx Server Error**: Backend issue → Show "Server error, try again later"

### User-Friendly Messages

All errors are converted to human-readable messages using `getErrorMessage()` utility. Examples:

- Network error: "Network error. Please check your internet connection."
- Deadline error: "Cannot edit team. The deadline has passed."
- Rate limit: "Too many invitations. Please wait a moment and try again."

## Security Considerations

### JWT Storage

- **Method**: localStorage
- **Key**: `hackamined_token`
- **Auto-attach**: Via Axios request interceptor
- **Auto-clear**: On 401 response or manual logout

### XSS Protection

- JWT in localStorage is vulnerable to XSS attacks
- Mitigated by:
  - Next.js built-in XSS protections
  - No use of `dangerouslySetInnerHTML`
  - Input sanitization on backend

### CORS

- Backend handles CORS configuration
- Frontend makes direct requests to backend URL

## Deployment

### Vercel Deployment

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Add registration features"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Connect GitHub repository to Vercel
   - Set framework preset: Next.js
   - Configure environment variables:
     - `NEXT_PUBLIC_API_BASE_URL`
     - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - Deploy

3. **Verify deployment:**
   - Test Google Sign-In
   - Test registration flow
   - Test team creation and management
   - Verify all API calls work with production backend

### Independent Deployment

Frontend and backend deploy **independently**:

- **Backend**: Already deployed at `https://backend-tan-nine-50.vercel.app`
- **Frontend**: Will deploy separately on Vercel
- **Communication**: Direct HTTPS API calls (no same-origin requirement)

## Troubleshooting

### Google Sign-In Not Working

- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is correct
- Check Google OAuth Client ID is configured for web application
- Ensure authorized JavaScript origins include your domain
- Check browser console for Google API errors

### API Calls Failing

- Verify `NEXT_PUBLIC_API_BASE_URL` points to correct backend
- Check backend is running: `https://backend-tan-nine-50.vercel.app/api/health`
- Inspect Network tab in browser DevTools
- Check JWT token exists in localStorage
- Verify CORS is configured on backend

### 401 Errors

- JWT token may be expired (backend default: 7 days)
- Sign out and sign in again to get new token
- Check token exists: `localStorage.getItem('hackamined_token')`

### Deadline Errors

- Team edit deadline is enforced by backend
- Check backend `.env` for `TEAM_EDIT_DEADLINE` value
- Frontend shows warning when deadline passed
- Backend returns 403 for edit attempts after deadline

## Testing Checklist

- [ ] Google Sign-In works and redirects correctly
- [ ] Registration form validates all fields
- [ ] Registration submits successfully to backend
- [ ] Dashboard loads user profile and team data
- [ ] Team creation works and redirects to team page
- [ ] Team leader can invite members (rate limit respected)
- [ ] Team leader can remove members (except self)
- [ ] Deadline enforcement prevents edits when deadline passed
- [ ] Team capacity enforced (max 4 members)
- [ ] Error messages are user-friendly
- [ ] Protected routes redirect unauthenticated users
- [ ] Token persists across page refreshes
- [ ] Logout clears token and redirects to home

## Support

For issues or questions:
- **Backend API**: Contact backend maintainer
- **Frontend Issues**: Check browser console for errors
- **Google OAuth**: Review Google Cloud Console configuration

---

**Last Updated**: February 3, 2026
