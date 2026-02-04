# HackaMined Backend API Guide

**Frontend Developer Documentation**

---

## 📋 Table of Contents

1. [API Overview](#api-overview)
2. [Base URLs & Environments](#base-urls--environments)
3. [Authentication & Authorization](#authentication--authorization)
4. [Common Headers](#common-headers)
5. [Global Error Handling](#global-error-handling)
6. [Rate Limits](#rate-limits)
7. [API Endpoints](#api-endpoints)
   - [Health & Status](#health--status)
   - [Authentication](#authentication-endpoints)
   - [User Management](#user-management)
   - [Team Management](#team-management)
   - [Invitations](#invitations)
8. [Example API Flows](#example-api-flows)
9. [Best Practices & Notes](#best-practices--notes)

---

## API Overview

The HackaMined backend is a serverless API built for hackathon registration and team management. It supports:
- Google OAuth authentication
- Individual user registration
- Team creation and management (max 4 members)
- Invitation system for team members
- JWT-based session management

**Tech Stack:** Node.js, Express, MongoDB, Vercel Serverless Functions

---

## Base URLs & Environments

| Environment | Base URL |
|------------|----------|
| **Production** | `https://YOUR_VERCEL_DOMAIN.vercel.app` |
| **Local Development** | `http://localhost:3000` |

> **Note:** Replace `YOUR_VERCEL_DOMAIN` with your actual Vercel deployment URL.

All API endpoints are prefixed with `/api`.

---

## Authentication & Authorization

### Authentication Flow

The API uses a two-step authentication process:

1. **Google Sign-In (Frontend)**: User authenticates with Google and receives an ID token
2. **Backend Verification**: Send the Google ID token to `/api/auth/google` to receive a JWT

### How to Obtain Token

**Step 1:** Implement Google Sign-In on your frontend using Google's OAuth library

```javascript
// Example using @react-oauth/google
import { GoogleLogin } from '@react-oauth/google';

<GoogleLogin
  onSuccess={(response) => {
    // response.credential contains the Google ID token
    authenticateWithBackend(response.credential);
  }}
  onError={() => console.error('Login Failed')}
/>
```

**Step 2:** Exchange Google ID token for JWT

```javascript
async function authenticateWithBackend(googleIdToken) {
  const response = await fetch('https://YOUR_DOMAIN.vercel.app/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: googleIdToken })
  });

  const data = await response.json();
  if (data.status === 'success') {
    localStorage.setItem('authToken', data.token);
    // Now you can use data.token for authenticated requests
  }
}
```

### Where to Send Token

Include the JWT in the `Authorization` header for all protected endpoints:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Token Expiry

- **JWT Expiry:** 7 days from issuance
- **Behavior:** Expired tokens return `401 Unauthorized` with message "Your token has expired! Please log in again."
- **Refresh Flow:** No automatic refresh. User must re-authenticate with Google.

### Frontend Actions

- **On 401 Error:** Clear stored token, redirect user to login
- **On App Load:** Check if token exists and is valid (call `/api/user/me`)
- **On Logout:** Clear token from storage

---

## Common Headers

### For All Requests

| Header | Value | Required | Notes |
|--------|-------|----------|-------|
| `Content-Type` | `application/json` | Yes (for POST/PUT) | All request/response bodies are JSON |

### For Protected Endpoints

| Header | Value | Required | Notes |
|--------|-------|----------|-------|
| `Authorization` | `Bearer <JWT_TOKEN>` | Yes | Replace `<JWT_TOKEN>` with actual JWT |

### Optional Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `Idempotency-Key` | `<unique-string>` | Prevents duplicate operations for critical endpoints (team creation, registration, invitations) |

**Example Idempotency Key:**
```javascript
const idempotencyKey = `${userId}-${operation}-${Date.now()}`;
// e.g., "abc123-team-create-1706984532000"
```

---

## Global Error Handling

All errors follow a consistent format:

### Error Response Format

```json
{
  "status": "fail",  // or "error" for 5xx
  "message": "Human-readable error message"
}
```

### HTTP Status Codes

| Code | Meaning | Frontend Action |
|------|---------|-----------------|
| `200` | Success | Process response data |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Show validation errors to user |
| `401` | Unauthorized | Redirect to login, clear auth token |
| `403` | Forbidden | Show permission denied message |
| `404` | Not Found | Show "not found" or redirect |
| `409` | Conflict | Show conflict message (e.g., "Team name taken") |
| `422` | Unprocessable Entity | Show validation errors (specific field issues) |
| `429` | Too Many Requests | Show rate limit message, implement retry with backoff |
| `500` | Internal Server Error | Show generic error, log for debugging |
| `503` | Service Unavailable | Show "service temporarily unavailable" |

### Common Error Examples

**400 Bad Request:**
```json
{
  "status": "fail",
  "message": "Google ID Token is required"
}
```

**401 Unauthorized:**
```json
{
  "status": "fail",
  "message": "Not authorized. Please log in."
}
```

**409 Conflict:**
```json
{
  "status": "fail",
  "message": "User is already part of a team"
}
```

**429 Rate Limited:**
```json
{
  "status": "fail",
  "message": "Too many requests, please try again later."
}
```

### Rate Limit Headers

Check these headers when you receive a `429` error:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed in time window |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset` | Timestamp when limit resets |

---

## Rate Limits

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| **Authentication** (`/api/auth/*`) | 5 requests | 60 seconds |
| **Team Invitations** (`/api/team/invite`) | 20 requests | 1 hour |
| **General** (All other endpoints) | 100 requests | 15 minutes |

**Frontend Handling:**
- Display countdown timer when rate limited
- Implement exponential backoff for retries
- Cache responses where appropriate

---

## API Endpoints

### Health & Status

#### 1. Root API Endpoint

**Purpose:** Check if backend is running

| Property | Value |
|----------|-------|
| **Endpoint** | `/api` |
| **Method** | `GET` |
| **Auth Required** | No |

**Request:**
```http
GET /api
```

**Success Response (200):**
```json
{
  "status": "ok",
  "service": "HackaMined Backend",
  "environment": "production",
  "timestamp": "2026-02-04T18:29:45.123Z"
}
```

**Use Case:** Initial health check, uptime monitoring

---

#### 2. Health Check Endpoint

**Purpose:** Detailed health status with database connectivity

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/health` |
| **Method** | `GET` |
| **Auth Required** | No |

**Request:**
```http
GET /api/health
```

**Success Response (200):**
```json
{
  "status": "ok",
  "uptime": 123456.789,
  "timestamp": "2026-02-04T18:29:45.123Z",
  "database": "connected"
}
```

**Degraded Response (503):**
```json
{
  "status": "degraded",
  "uptime": 123456.789,
  "timestamp": "2026-02-04T18:29:45.123Z",
  "database": "disconnected"
}
```

**Frontend Handling:**
- Display service status badge
- If `503`, show "Database issues" warning

---

### Authentication Endpoints

#### 3. Google Authentication

**Purpose:** Exchange Google ID token for JWT

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/auth/google` |
| **Method** | `POST` |
| **Auth Required** | No |
| **Rate Limited** | Yes (5 req/min) |

**Headers:**
| Header | Required | Value |
|--------|----------|-------|
| `Content-Type` | Yes | `application/json` |

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `idToken` | string | Yes | Google ID token from OAuth flow |

**Request Example:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePicture": "https://lh3.googleusercontent.com/...",
    "registrationStatus": "PENDING",
    "teamId": null,
    "isTeamLeader": false
  }
}
```

**Error Responses:**

| Status | Scenario | Message |
|--------|----------|---------|
| `400` | Missing token | "Google ID Token is required" |
| `401` | Invalid token | "Invalid Google Token" |
| `401` | Unverified email | "Google email must be verified" |
| `429` | Rate limited | "Too many requests, please try again later." |

**Frontend Example (Fetch):**
```javascript
async function authenticateUser(googleIdToken) {
  try {
    const response = await fetch('https://YOUR_DOMAIN.vercel.app/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: googleIdToken })
    });

    const data = await response.json();

    if (data.status === 'success') {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Auth failed:', error);
    throw error;
  }
}
```

**Frontend Example (Axios):**
```javascript
import axios from 'axios';

async function authenticateUser(googleIdToken) {
  const { data } = await axios.post(
    'https://YOUR_DOMAIN.vercel.app/api/auth/google',
    { idToken: googleIdToken }
  );

  localStorage.setItem('authToken', data.token);
  return data.user;
}
```

---

### User Management

#### 4. Get User Profile

**Purpose:** Retrieve authenticated user's full profile with team details

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/user/me` |
| **Method** | `GET` |
| **Auth Required** | Yes |

**Headers:**
| Header | Required | Value |
|--------|----------|-------|
| `Authorization` | Yes | `Bearer <JWT_TOKEN>` |

**Request:**
```http
GET /api/user/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "googleId": "112345678901234567890",
    "fullName": "John Doe",
    "profilePicture": "https://lh3.googleusercontent.com/...",
    "phoneNumber": "+919876543210",
    "whatsappNumber": "+919876543210",
    "college": "MIT",
    "degree": "B.Tech",
    "branch": "Computer Science",
    "graduationYear": 2026,
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India",
    "githubUrl": "https://github.com/johndoe",
    "linkedinUrl": "https://linkedin.com/in/johndoe",
    "portfolioUrl": "https://johndoe.dev",
    "teamId": null,
    "isTeamLeader": false,
    "registrationStatus": "REGISTERED",
    "createdAt": "2026-01-15T10:30:00.000Z",
    "updatedAt": "2026-02-01T14:20:00.000Z"
  }
}
```

**With Team (Populated):**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "fullName": "John Doe",
    "teamId": {
      "_id": "507f191e810c19729de860ea",
      "name": "Code Warriors",
      "leaderId": "507f1f77bcf86cd799439011",
      "members": ["507f1f77bcf86cd799439011", "..."],
      "status": "OPEN",
      "createdAt": "2026-02-01T10:00:00.000Z"
    },
    "isTeamLeader": true,
    "registrationStatus": "REGISTERED",
    // ... other fields
  }
}
```

**Error Responses:**

| Status | Scenario | Message |
|--------|----------|---------|
| `401` | No token | "Not authorized" |
| `401` | Invalid/expired token | "Invalid or expired token" |
| `404` | User deleted | "User not found" |

**Frontend Use Cases:**
- Display user dashboard
- Pre-fill profile edit forms
- Show team membership status
- Check registration completion

---

#### 5. Get Registration Status

**Purpose:** Quick check of user's registration and team status

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/user/status` |
| **Method** | `GET` |
| **Auth Required** | Yes |

**Headers:**
| Header | Required | Value |
|--------|----------|-------|
| `Authorization` | Yes | `Bearer <JWT_TOKEN>` |

**Request:**
```http
GET /api/user/status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "status": "REGISTERED",
    "teamId": "507f191e810c19729de860ea",
    "isTeamLeader": true
  }
}
```

**Possible Values:**
- `status`: `"PENDING"` or `"REGISTERED"`
- `teamId`: ObjectId string or `null`
- `isTeamLeader`: `true` or `false`

**Frontend Use Cases:**
- Conditional navigation (redirect PENDING users to registration form)
- Show/hide team features
- Display registration progress

---

#### 6. Complete Individual Registration

**Purpose:** Complete user profile and registration (also auto-joins team if invited)

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/register/individual` |
| **Method** | `POST` |
| **Auth Required** | Yes |
| **Idempotency** | Supported |

**Headers:**
| Header | Required | Value |
|--------|----------|-------|
| `Authorization` | Yes | `Bearer <JWT_TOKEN>` |
| `Content-Type` | Yes | `application/json` |
| `Idempotency-Key` | Optional | Unique string to prevent duplicates |

**Request Body:**

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `fullName` | string | Yes | Non-empty | |
| `phoneNumber` | string | No | Valid mobile phone format | |
| `whatsappNumber` | string | No | Valid mobile phone format | |
| `college` | string | No | | |
| `degree` | string | No | | |
| `branch` | string | No | | |
| `graduationYear` | number | No | Integer 2020-2030 | |
| `city` | string | No | | |
| `state` | string | No | | |
| `country` | string | No | | Defaults to "India" |
| `githubUrl` | string | No | Valid URL | |
| `linkedinUrl` | string | No | Valid URL | |
| `portfolioUrl` | string | No | Valid URL | |

**Request Example:**
```json
{
  "fullName": "John Doe",
  "phoneNumber": "+919876543210",
  "whatsappNumber": "+919876543210",
  "college": "MIT",
  "degree": "B.Tech",
  "branch": "Computer Science",
  "graduationYear": 2026,
  "city": "Bangalore",
  "state": "Karnataka",
  "country": "India",
  "githubUrl": "https://github.com/johndoe",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "portfolioUrl": "https://johndoe.dev"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "fullName": "John Doe",
      "registrationStatus": "REGISTERED",
      "teamId": null,
      // ... all other fields
    },
    "team": null
  }
}
```

**Success with Auto-Join (200):**
If user had a pending invitation and team has space:
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "registrationStatus": "REGISTERED",
      "teamId": "507f191e810c19729de860ea",
      "isTeamLeader": false,
      // ... other fields
    },
    "team": {
      "_id": "507f191e810c19729de860ea",
      "name": "Code Warriors",
      "leaderId": "...",
      "members": ["...", "507f1f77bcf86cd799439011"],
      "status": "OPEN"
    }
  }
}
```

**Error Responses:**

| Status | Scenario | Message |
|--------|----------|---------|
| `400` | Missing required fields | "Full name is required" |
| `400` | Invalid phone | "Invalid phone number" |
| `400` | Invalid URL | "Invalid GitHub URL" |
| `409` | Already registered | "User is already registered" |

**Frontend Handling:**
- **On Success without team:** Navigate to dashboard, show "Create or Join Team" options
- **On Success with team:** Show "You've joined [Team Name]!" notification
- **Validation:** Validate URLs and phone numbers client-side before submission

---

### Team Management

#### 7. Create Team

**Purpose:** Create a new team with the authenticated user as leader

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/team/create` |
| **Method** | `POST` |
| **Auth Required** | Yes |
| **Idempotency** | Supported |

**Headers:**
| Header | Required | Value |
|--------|----------|-------|
| `Authorization` | Yes | `Bearer <JWT_TOKEN>` |
| `Content-Type` | Yes | `application/json` |
| `Idempotency-Key` | Recommended | Unique string |

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | Yes | Min 3 characters, unique |

**Request Example:**
```json
{
  "name": "Code Warriors"
}
```

**Success Response (201):**
```json
{
  "status": "success",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "name": "Code Warriors",
    "leaderId": "507f1f77bcf86cd799439011",
    "members": ["507f1f77bcf86cd799439011"],
    "status": "OPEN",
    "createdAt": "2026-02-04T18:30:00.000Z",
    "updatedAt": "2026-02-04T18:30:00.000Z"
  }
}
```

**Error Responses:**

| Status | Scenario | Message |
|--------|----------|---------|
| `400` | Team name too short | "Team name must be at least 3 characters" |
| `400` | Missing name | Field validation message |
| `403` | User not registered | "You must complete individual registration first" |
| `409` | Already in team | "User is already part of a team" |
| `409` | Name already taken | "Duplicate field value: 'Code Warriors'. Please use another value!" |

**Frontend Handling:**
- Check name availability before submission (or handle 409 gracefully)
- Update local state with team ID
- Navigate to team dashboard
- Show success notification

**Edge Cases:**
- User cannot create multiple teams
- Team name is globally unique
- Leader automatically becomes first member

---

#### 8. Get Team Details

**Purpose:** Retrieve full team information with populated members

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/team/:id` |
| **Method** | `GET` |
| **Auth Required** | Yes |

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Team ObjectId |

**Headers:**
| Header | Required | Value |
|--------|----------|-------|
| `Authorization` | Yes | `Bearer <JWT_TOKEN>` |

**Request:**
```http
GET /api/team/507f191e810c19729de860ea
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "name": "Code Warriors",
    "leaderId": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "profilePicture": "https://..."
    },
    "members": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "fullName": "John Doe",
        "email": "john@example.com",
        "college": "MIT",
        "branch": "CS",
        "graduationYear": 2026
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "fullName": "Jane Smith",
        "email": "jane@example.com",
        // ... other fields
      }
    ],
    "status": "OPEN",
    "lockDate": null,
    "createdAt": "2026-02-04T18:30:00.000Z",
    "updatedAt": "2026-02-04T19:00:00.000Z"
  }
}
```

**Error Responses:**

| Status | Scenario | Message |
|--------|----------|---------|
| `401` | Not authenticated | "Not authorized" |
| `404` | Team doesn't exist | "Team not found" |

**Frontend Use Cases:**
- Display team dashboard
- Show member list with details
- Check if team is open or locked
- Display team leader badge

**Important Notes:**
- Members array is fully populated with user details
- Use this to display team roster
- `status` can be `"OPEN"` or `"LOCKED"` (after deadline)

---

#### 9. Invite Team Member

**Purpose:** Invite a user to join the team (by email)

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/team/invite` |
| **Method** | `POST` |
| **Auth Required** | Yes (Team Leader only) |
| **Rate Limited** | Yes (20 req/hour) |
| **Idempotency** | Supported |

**Headers:**
| Header | Required | Value |
|--------|----------|-------|
| `Authorization` | Yes | `Bearer <JWT_TOKEN>` |
| `Content-Type` | Yes | `application/json` |
| `Idempotency-Key` | Recommended | Unique string |

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `email` | string | Yes | Valid email format |

**Request Example:**
```json
{
  "email": "newmember@example.com"
}
```

**Success Response - User Added Immediately (200):**
If user is already registered:
```json
{
  "status": "success",
  "data": {
    "status": "ADDED",
    "member": {
      "_id": "507f1f77bcf86cd799439012",
      "email": "newmember@example.com",
      "fullName": "Jane Smith",
      "teamId": "507f191e810c19729de860ea"
    },
    "teamId": "507f191e810c19729de860ea"
  }
}
```

**Success Response - Invitation Created (200):**
If user not registered yet:
```json
{
  "status": "success",
  "data": {
    "status": "INVITED",
    "invitation": {
      "_id": "507f191e810c19729de860eb",
      "email": "newmember@example.com",
      "teamId": "507f191e810c19729de860ea",
      "invitedBy": "507f1f77bcf86cd799439011",
      "status": "PENDING",
      "createdAt": "2026-02-04T18:35:00.000Z"
    }
  }
}
```

**Error Responses:**

| Status | Scenario | Message |
|--------|----------|---------|
| `400` | Invalid email | "Please provide a valid email" |
| `403` | Not team leader | "Only team leaders can invite members" |
| `403` | Deadline passed | "Team editing deadline has passed. Teams are now locked." |
| `409` | User in another team | "User is already part of another team" |
| `409` | Team full | "Team is full or user already added" / "Team is already full (Max 4 members)" |
| `409` | Duplicate invitation | "Invitation already sent to this email" |
| `429` | Rate limited | "Too many requests, please try again later." |

**Frontend Handling:**
- **For ADDED:** Update team members list immediately, show success notification
- **For INVITED:** Show "Invitation sent to [email]" message
- **Team Full:** Disable invite button when team has 4 members
- **Rate Limiting:** Show remaining invites or cooldown timer

**Important Edge Cases:**
- Team can have max 4 members
- Each email can only have one pending invitation per team
- After deadline (configured via `TEAM_EDIT_DEADLINE`), invitations fail
- Invitations auto-accepted when invited user completes registration

---

#### 10. Remove Team Member

**Purpose:** Remove a member from the team (leader only)

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/team/remove-member` |
| **Method** | `POST` |
| **Auth Required** | Yes (Team Leader only) |
| **Idempotency** | Supported |

**Headers:**
| Header | Required | Value |
|--------|----------|-------|
| `Authorization` | Yes | `Bearer <JWT_TOKEN>` |
| `Content-Type` | Yes | `application/json` |
| `Idempotency-Key` | Optional | Unique string |

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `memberId` | string | Yes | User ObjectId to remove |

**Request Example:**
```json
{
  "memberId": "507f1f77bcf86cd799439012"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "name": "Code Warriors",
    "leaderId": "507f1f77bcf86cd799439011",
    "members": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "fullName": "John Doe",
        "email": "john@example.com"
      }
      // Removed member is no longer in array
    ],
    "status": "OPEN"
  }
}
```

**Error Responses:**

| Status | Scenario | Message |
|--------|----------|---------|
| `400` | Missing memberId | "memberId is required" |
| `403` | Not team leader | "Only team leaders can remove members" |
| `403` | Leader removing self | "Leader cannot remove themselves. Delete team instead?" |
| `403` | Deadline passed | "Team editing deadline has passed" |
| `404` | Member not in team | "Member not found in team" |

**Frontend Handling:**
- Update team members list immediately
- Show confirmation dialog before removal
- Notify removed member (if implementing real-time features)
- Leader cannot remove themselves

---

### Invitations

#### 11. Get My Invitations

**Purpose:** Retrieve all pending invitations for authenticated user

| Property | Value |
|----------|-------|
| **Endpoint** | `/api/invitations` |
| **Method** | `GET` |
| **Auth Required** | Yes |

**Headers:**
| Header | Required | Value |
|--------|----------|-------|
| `Authorization` | Yes | `Bearer <JWT_TOKEN>` |

**Request:**
```http
GET /api/invitations
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "507f191e810c19729de860eb",
      "email": "user@example.com",
      "teamId": {
        "_id": "507f191e810c19729de860ea",
        "name": "Code Warriors",
        "leaderId": "507f1f77bcf86cd799439011",
        "members": ["..."],
        "status": "OPEN"
      },
      "invitedBy": {
        "_id": "507f1f77bcf86cd799439011",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "status": "PENDING",
      "createdAt": "2026-02-04T18:35:00.000Z",
      "updatedAt": "2026-02-04T18:35:00.000Z"
    }
  ]
}
```

**Empty Response (200):**
```json
{
  "status": "success",
  "data": []
}
```

**Frontend Use Cases:**
- Display invitation notifications
- Show team invites on dashboard
- Check for invitations after login
- Badge count on notifications icon

**Important Notes:**
- Only returns `PENDING` invitations
- `teamId` and `invitedBy` are populated with full details
- Invitations auto-accepted during `/api/register/individual` if team has space
- No manual accept/reject endpoints (auto-accepted on registration)

---

## Example API Flows

### Flow 1: User Registration Journey

```javascript
// 1. User signs in with Google
const googleCredential = await googleSignIn();

// 2. Authenticate with backend
const authResponse = await fetch('/api/auth/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idToken: googleCredential })
});
const { token, user } = await authResponse.json();

// 3. Check registration status
if (user.registrationStatus === 'PENDING') {
  // 4. Complete registration
  const regResponse = await fetch('/api/register/individual', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      fullName: 'John Doe',
      phoneNumber: '+919876543210',
      college: 'MIT',
      // ... other fields
    })
  });

  const { data } = await regResponse.json();

  if (data.team) {
    // User auto-joined a team via invitation
    console.log(`Joined team: ${data.team.name}`);
  }
}

// 5. Get full profile
const profileResponse = await fetch('/api/user/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const profile = await profileResponse.json();
```

---

### Flow 2: Team Creation & Invitation

```javascript
const authToken = localStorage.getItem('authToken');

// 1. Create a team
const createTeamResponse = await fetch('/api/team/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
    'Idempotency-Key': `create-team-${Date.now()}`
  },
  body: JSON.stringify({ name: 'Code Warriors' })
});

const { data: team } = await createTeamResponse.json();
console.log(`Team created: ${team._id}`);

// 2. Invite members
const inviteEmail = 'teammate@example.com';
const inviteResponse = await fetch('/api/team/invite', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify({ email: inviteEmail })
});

const { data: inviteResult } = await inviteResponse.json();

if (inviteResult.status === 'ADDED') {
  console.log('User added immediately!');
} else {
  console.log('Invitation sent, waiting for user to register');
}

// 3. Get updated team details
const teamResponse = await fetch(`/api/team/${team._id}`, {
  headers: { 'Authorization': `Bearer ${authToken}` }
});

const { data: updatedTeam } = await teamResponse.json();
console.log(`Team now has ${updatedTeam.members.length} members`);
```

---

### Flow 3: Checking Invitations on Login

```javascript
async function checkInvitationsOnLogin(authToken) {
  try {
    const response = await fetch('/api/invitations', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const { data: invitations } = await response.json();

    if (invitations.length > 0) {
      // Show notification
      invitations.forEach(inv => {
        showNotification(
          `You're invited to join "${inv.teamId.name}" by ${inv.invitedBy.fullName}`
        );
      });

      // Note: Invitations auto-accept during registration
      // Frontend can inform user that completing registration will auto-join
    }
  } catch (error) {
    console.error('Failed to fetch invitations:', error);
  }
}
```

---

### Flow 4: Error Handling Pattern

```javascript
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        ...options.headers
      }
    });

    const data = await response.json();

    // Handle different status codes
    if (response.ok) {
      return data;
    }

    // Error handling
    switch (response.status) {
      case 401:
        // Unauthorized - redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        break;

      case 403:
        // Forbidden - show permission error
        showError('You do not have permission to perform this action');
        break;

      case 409:
        // Conflict - show specific conflict message
        showError(data.message);
        break;

      case 429:
        // Rate limited - show retry timer
        const resetTime = response.headers.get('X-RateLimit-Reset');
        showRateLimitError(resetTime);
        break;

      default:
        showError(data.message || 'An error occurred');
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

---

## Best Practices & Notes

### Frontend Best Practices

1. **Token Management**
   - Store JWT in `localStorage` or secure `httpOnly` cookie
   - Clear token on 401 errors
   - Validate token on app load with `/api/user/me`

2. **Error Handling**
   - Always check `response.ok` before parsing JSON
   - Handle network errors separately from API errors
   - Display user-friendly error messages
   - Log errors for debugging

3. **Loading States**
   - Show loading indicators during API calls
   - Disable submit buttons to prevent double-submission
   - Use skeleton loaders for better UX

4. **Validation**
   - Validate inputs client-side before API calls
   - Show field-level errors from 400 responses
   - Use same validation rules as backend

5. **Idempotency**
   - Use `Idempotency-Key` for critical operations (team create, registration)
   - Generate unique keys: `${userId}-${operation}-${timestamp}`
   - Store keys to prevent duplicate submissions

6. **Rate Limiting**
   - Check `X-RateLimit-Remaining` header
   - Implement client-side throttling
   - Show countdown timer on 429 errors

7. **Caching**
   - Cache user profile after login
   - Invalidate cache on profile updates
   - Use SWR or React Query for automatic caching

8. **Team Management**
   - Disable "Invite" button when team has 4 members
   - Show team capacity (e.g., "3/4 members")
   - Warn before removing team members

### Important Behavioral Notes

1. **Auto-Join on Registration**
   - Users with pending invitations auto-join teams when completing registration
   - Only works if team has space (< 4 members)
   - Check `data.team` in registration response

2. **Team Edit Deadline**
   - Configured via `TEAM_EDIT_DEADLINE` env var (default: 2026-03-01)
   - After deadline, all team modifications fail with 403
   - Teams become `LOCKED` status

3. **Email Normalization**
   - All emails stored in lowercase
   - Whitespace trimmed automatically
   - Invitations match on normalized email

4. **Concurrent Operations**
   - Backend uses atomic operations to prevent race conditions
   - Multiple simultaneous invites may fail if team fills up
   - Handle 409 conflicts gracefully

5. **Profile vs Registration Status**
   - Users exist after Google auth (`PENDING` status)
   - Full registration required for team features
   - Check `registrationStatus` before showing team UI

### Common Edge Cases

| Scenario | Behavior |
|----------|----------|
| User invited before registration | Auto-joins on registration completion |
| Team reaches 4 members | Further invites fail with 409 |
| Leader removes themselves | Fails with 403 (delete team instead) |
| User tries to create 2nd team | Fails with 409 |
| Deadline has passed | All team edits fail with 403 |
| Token expires mid-session | Returns 401, redirect to login |
| Duplicate team name | Fails with 409 |
| Invalid Google token | Fails with 401 |

### Testing Checklist

- [ ] Google authentication flow
- [ ] Registration completion
- [ ] Team creation with unique names
- [ ] Inviting registered vs unregistered users
- [ ] Team capacity limits (4 members)
- [ ] Leader permissions
- [ ] Token expiry handling
- [ ] Rate limit behavior
- [ ] Network error handling
- [ ] Offline/online state transitions

### CORS Configuration

The backend is configured to accept requests from:
- Production: `https://hackamined.csi-nirma.in`
- Allowed Methods: `GET, POST, PUT, DELETE, PATCH, OPTIONS`
- Allowed Headers: `Content-Type, Authorization`

**If developing on a different domain**, update the CORS origin in `vercel.json`.

---

## Questions or Issues?

For API bugs or feature requests, contact the backend team or file an issue in the repository.

**Current API Version:** 1.0.0
**Last Updated:** February 4, 2026

---
