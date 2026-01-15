# NextAuth.js Setup Documentation

## Overview
This project uses NextAuth.js v4 for authentication with a custom credential provider. The authentication system stores user data in a local JSON file (`src/app/data/users.json`) for demonstration purposes.

## Configuration

### NextAuth API Route
- **Path**: `src/app/api/auth/[...nextauth]/route.ts`
- **Provider**: Credential Provider
- **Strategy**: JWT-based sessions
- **Session Duration**: 30 days

### Middleware
- **Path**: `src/app/middleware.ts`
- Uses `getToken()` from `next-auth/jwt` to verify authentication status
- Protects routes based on authentication status
- Redirects unauthenticated users to login page

### Protected Routes
- All routes except `/`, `/login`, `/register`, and `/forgot-password` are protected
- Auth routes (`/login`, `/register`) redirect authenticated users to home

## Features

### Registration
- Endpoint: `POST /api/auth/register`
- Validates email format and required fields
- Checks for duplicate emails
- Stores user data in JSON file

### Login
- Uses credential provider from NextAuth
- Verifies email/password against stored users
- Creates JWT session upon successful login

### Profile Access
- Protected route at `/profile`
- Displays user information from session
- Requires authentication to access

## Security Notes

1. **Password Storage**: Currently stores passwords in plain text in the JSON file. In production, passwords should be hashed using bcrypt or similar library.

2. **Secret Key**: Uses default secret key. In production, set a strong `AUTH_SECRET` in environment variables.

3. **File-based Storage**: User data is stored in a JSON file. In production, consider using a database like PostgreSQL or MongoDB.

## Environment Variables

```
AUTH_SECRET=your_strong_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/route.ts
│   │       └── register/route.ts
│   ├── components/
│   │   └── Navbar.tsx
│   ├── data/
│   │   └── users.json
│   ├── lib/
│   │   └── auth.ts
│   ├── login/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── providers.tsx
│   └── middleware.ts
```

## Usage

### Client-side Authentication
```tsx
import { useSession, signIn, signOut } from 'next-auth/react'

const MyComponent = () => {
  const { data: session } = useSession()
  
  if(session) {
    // User is authenticated
    return <div>Welcome {session.user.name}</div>
  }
  
  // User is not authenticated
  return <button onClick={() => signIn()}>Login</button>
}
```

### Server-side Authentication
```tsx
import { auth } from '@/app/api/auth/[...nextauth]/route'

export default async function Page() {
  const session = await auth()
  
  if(!session) {
    return <div>Please log in</div>
  }
  
  return <div>Welcome {session.user.name}</div>
}
```

### Getting Current User
```ts
import { currentUser } from '@/app/lib/auth'

const user = await currentUser()
```

## Testing Credentials

Default test users:
- Email: `john@example.com`, Password: `password123`
- Email: `jane@example.com`, Password: `password123`