# Architecture Overview

This document describes the architecture and design decisions of the Tareq Blogs platform.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Application Layers](#application-layers)
- [Data Flow](#data-flow)
- [Authentication & Authorization](#authentication--authorization)
- [Database Schema](#database-schema)
- [Module Structure](#module-structure)
- [State Management](#state-management)
- [API Design](#api-design)

---

## Tech Stack

| Category             | Technology                           |
| -------------------- | ------------------------------------ |
| **Framework**        | Next.js 16 (App Router)              |
| **Runtime**          | React 19                             |
| **Language**         | TypeScript 5                         |
| **Database**         | MongoDB with Mongoose 9              |
| **Authentication**   | NextAuth v5 (Auth.js)                |
| **Data Fetching**    | TanStack React Query                 |
| **Styling**          | Tailwind CSS v4                      |
| **State Management** | Zustand                              |
| **Forms**            | React Hook Form                      |
| **Rich Text Editor** | Quill                                |
| **Animations**       | Framer Motion                        |
| **Image Hosting**    | Cloudinary                           |
| **Code Quality**     | ESLint, Prettier, Husky, lint-staged |

---

## Directory Structure

```
├── app/                          # Next.js App Router
│   ├── (protected)/              # Protected routes (requires auth)
│   │   └── admin/                # Admin dashboard & management
│   │       ├── blogs/            # Blog CRUD operations
│   │       └── categories/       # Category management
│   ├── (public)/                 # Public routes
│   │   ├── (auth)/               # Authentication pages
│   │   ├── (home)/               # Homepage
│   │   └── blogs/                # Public blog listing & details
│   ├── api/                      # API Routes
│   │   ├── auth/                 # NextAuth endpoints
│   │   ├── blogs/                # Blog CRUD API
│   │   ├── categories/           # Category API
│   │   └── seed/                 # Database seeding
│   ├── layout.tsx                # Root layout
│   ├── manifest.ts               # PWA manifest
│   ├── robots.ts                 # robots.txt generation
│   └── sitemap.ts                # Sitemap generation
│
├── components/                   # React components
│   ├── layouts/                  # Layout wrappers
│   ├── providers/                # Context providers
│   ├── shared/                   # Reusable components
│   └── ui/                       # UI primitives
│
├── constant/                     # Application constants
├── enum/                         # TypeScript enums
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
│   ├── auth.lib.ts               # NextAuth configuration
│   ├── axios-instance.lib.ts     # HTTP client setup
│   ├── cloudinary.ts             # Image upload utilities
│   └── db.ts                     # Database connection
│
├── models/                       # Mongoose models
│   ├── Blog.ts
│   ├── BlogLike.ts
│   ├── Category.ts
│   └── User.ts
│
├── modules/                      # Feature modules
│   ├── analytics/                # Google Analytics
│   ├── auth/                     # Authentication UI
│   ├── blogs/                    # Blog feature
│   ├── categories/               # Category feature
│   └── dashboard/                # Dashboard widgets
│
├── service/                      # API service layer
├── styles/                       # Global styles
└── types/                        # TypeScript types
```

---

## Application Layers

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
│  (React Components, Layouts, UI Components, Providers)       │
├─────────────────────────────────────────────────────────────┤
│                      Application Layer                       │
│  (Hooks, Services, State Management, Form Handling)          │
├─────────────────────────────────────────────────────────────┤
│                         API Layer                            │
│  (Next.js API Routes, Authentication, Validation)            │
├─────────────────────────────────────────────────────────────┤
│                        Data Layer                            │
│  (Mongoose Models, MongoDB, Cloudinary)                      │
└─────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

1. **Presentation Layer**
   - React components for UI rendering
   - Layout components for page structure
   - Theme management (dark/light mode)
   - Loading and error states

2. **Application Layer**
   - Custom hooks for data fetching (React Query)
   - Form validation with React Hook Form
   - Client-side service abstractions
   - State management with Zustand

3. **API Layer**
   - RESTful API endpoints
   - Request validation
   - Authentication/Authorization checks
   - Error handling and response formatting

4. **Data Layer**
   - Mongoose schemas and models
   - Database connection pooling
   - Image upload to Cloudinary
   - Data transformations

---

## Data Flow

### Client-Side Data Fetching

```
Component → useQuery Hook → Service → Axios → API Route → Database
                ↓
           React Query Cache
                ↓
            UI Update
```

### Form Submission Flow

```
Form Component
     ↓
React Hook Form (Validation)
     ↓
useMutation Hook
     ↓
Service Layer (Axios)
     ↓
API Route (Server)
     ↓
Mongoose Model → MongoDB
     ↓
Response → Cache Invalidation → UI Update
```

---

## Authentication & Authorization

### Authentication Flow (Google OAuth)

```
1. User clicks "Sign in with Google"
2. NextAuth redirects to Google OAuth
3. Google authenticates user
4. Callback receives ID token
5. Server validates token via /api/auth/google-login
6. User document created/updated in MongoDB
7. JWT session token generated
8. User redirected to dashboard
```

### User Roles

| Role       | Permissions                                                          |
| ---------- | -------------------------------------------------------------------- |
| **ADMIN**  | Full access to all features, manage users, categories, and all blogs |
| **WRITER** | Create, edit, delete own blogs                                       |
| **READER** | View blogs, like, comment                                            |

### Route Protection

- **Public Routes**: `/`, `/blogs`, `/blogs/[slug]`, `/sign-in`
- **Protected Routes**: `/admin/*` (requires authentication)

The `authorized` callback in NextAuth middleware handles route protection:

```typescript
authorized({ auth, request: { nextUrl } }) {
  const isLoggedIn = !!auth?.user;
  const isPublicRoute = !pathname.includes(Routes.ADMIN);
  if (isPublicRoute) return true;
  return !!isLoggedIn;
}
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐
│    User     │       │  Category   │
├─────────────┤       ├─────────────┤
│ _id         │       │ _id         │
│ name        │       │ name        │
│ email       │       │ description │
│ image       │       │ icon        │
│ role        │       │ status      │
│ createdAt   │       │ createdAt   │
│ updatedAt   │       │ updatedAt   │
└─────┬───────┘       └──────┬──────┘
      │                      │
      │  1:N                 │  1:N
      ▼                      ▼
┌─────────────────────────────────┐
│              Blog               │
├─────────────────────────────────┤
│ _id                             │
│ title                           │
│ slug (unique)                   │
│ content (rich text)             │
│ coverImage                      │
│ authorId → User                 │
│ categoryId → Category           │
│ tags                            │
│ views                           │
│ status (DRAFT|PUBLISHED|ARCHIVED)
│ isFeatured                      │
│ metaKeywords                    │
│ metaDescription                 │
│ publishedAt                     │
│ createdAt                       │
│ updatedAt                       │
└────────────┬────────────────────┘
             │
             │  1:N
             ▼
┌─────────────────────────────────┐
│           BlogLike              │
├─────────────────────────────────┤
│ _id                             │
│ blogId → Blog                   │
│ userId → User                   │
│ createdAt                       │
│ updatedAt                       │
└─────────────────────────────────┘
```

### Blog Status Flow

```
DRAFT → PUBLISHED → ARCHIVED
  ↑         │          │
  └─────────┴──────────┘
```

---

## Module Structure

Each feature module follows a consistent structure:

```
modules/
└── blogs/
    ├── blog.enum.ts          # Feature-specific enums
    ├── blog.helper.ts        # Utility functions
    ├── blog.hooks.ts         # React Query hooks
    ├── blog.type.ts          # TypeScript interfaces
    ├── blog.validation.ts    # Form validation schemas
    └── components/
        ├── admin/            # Admin-only components
        ├── public/           # Public-facing components
        └── shared/           # Shared components
```

### Benefits

- **Encapsulation**: All feature-related code in one place
- **Scalability**: Easy to add new features
- **Maintainability**: Clear boundaries between features
- **Reusability**: Shared components can be promoted

---

## State Management

### Server State (React Query)

Used for all server-synchronized data:

```typescript
// Data fetching
const { data, isLoading } = useQuery({
  queryKey: [QueryKey.BLOGS, params],
  queryFn: () => blogService.getBlogs(params),
});

// Mutations with cache invalidation
const mutation = useMutation({
  mutationFn: blogService.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QueryKey.BLOGS] });
  },
});
```

### Client State (Zustand)

Used for UI-specific state:

- Theme preferences
- UI toggles
- Session management

### Form State (React Hook Form)

Isolated form state with validation:

```typescript
const { register, handleSubmit, formState } = useForm<IBlogFormData>({
  resolver: zodResolver(blogSchema),
});
```

---

## API Design

### RESTful Endpoints

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| GET    | `/api/blogs`          | List blogs with pagination |
| GET    | `/api/blogs/:id`      | Get single blog            |
| POST   | `/api/blogs`          | Create blog                |
| PUT    | `/api/blogs/:id`      | Update blog                |
| DELETE | `/api/blogs/:id`      | Delete blog                |
| POST   | `/api/blogs/:id/like` | Toggle like                |
| POST   | `/api/blogs/:id/view` | Increment views            |
| GET    | `/api/categories`     | List categories            |
| POST   | `/api/categories`     | Create category            |
| PUT    | `/api/categories/:id` | Update category            |
| DELETE | `/api/categories/:id` | Delete category            |

### Response Format

```typescript
// Success Response
{
  status: 200,
  data: { ... },
  message: "Success"
}

// Error Response
{
  status: 400,
  error: "Validation error",
  message: "Title is required"
}

// Paginated Response
{
  status: 200,
  data: [...],
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10
  }
}
```

---

## SEO Optimizations

- **Dynamic Metadata**: Per-page meta tags
- **Open Graph**: Social sharing images
- **Structured Data**: JSON-LD schemas (Organization, Website, Article)
- **Sitemap**: Auto-generated `/sitemap.xml`
- **Robots**: SEO-friendly `/robots.txt`
- **Canonical URLs**: Prevent duplicate content

---

## Performance Considerations

1. **Image Optimization**: Cloudinary transformations
2. **Code Splitting**: Next.js automatic splitting
3. **Data Caching**: React Query stale-while-revalidate
4. **Connection Pooling**: MongoDB connection reuse
5. **Top Loader**: Visual feedback during navigation
6. **Loading States**: Skeleton components

---

## Security Measures

1. **Authentication**: Secure JWT sessions via NextAuth
2. **Authorization**: Role-based access control
3. **Input Validation**: Server-side validation
4. **CSRF Protection**: Built-in NextAuth protection
5. **Environment Variables**: Sensitive data in `.env`
6. **XSS Prevention**: React's automatic escaping
