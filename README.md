# Tareq Blogs

A modern, full-stack blog platform built with Next.js 16, featuring a beautiful UI, rich text editing, and a powerful admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

## ✨ Features

- **📝 Rich Text Editor** - Create beautiful blog posts with Quill editor
- **🔐 Google OAuth** - Secure authentication via NextAuth
- **👥 Role-Based Access** - Admin, Writer, and Reader roles
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **🌓 Dark Mode** - System-aware theme switching
- **🖼️ Image Uploads** - Cloudinary integration for media management
- **🔍 SEO Optimized** - Meta tags, sitemaps, structured data
- **⚡ Performance** - React Query caching, optimized images
- **📊 Analytics** - Google Analytics integration

## 🛠️ Tech Stack

| Category  | Technology                                                                                   |
| --------- | -------------------------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router)                                               |
| Frontend  | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)                |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| Database  | [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)                 |
| Auth      | [NextAuth v5](https://authjs.dev/) (Auth.js)                                                 |
| State     | [React Query](https://tanstack.com/query), [Zustand](https://zustand-demo.pmnd.rs/)          |
| Forms     | [React Hook Form](https://react-hook-form.com/)                                              |
| Editor    | [Quill](https://quilljs.com/)                                                                |
| Images    | [Cloudinary](https://cloudinary.com/)                                                        |

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (protected)/admin/  # Admin dashboard
│   ├── (public)/           # Public pages
│   └── api/                # API routes
├── components/             # React components
├── lib/                    # Utilities & configs
├── models/                 # Mongoose models
├── modules/                # Feature modules
└── service/                # API services
```

> 📖 See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Google OAuth credentials
- Cloudinary account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/tareq-blogs.git
cd tareq-blogs
```

2. **Install dependencies**

```bash
yarn install
```

3. **Configure environment variables**

Create a `.env.local` file:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net

# Authentication
AUTH_SECRET=your-auth-secret
AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT
JWT_SECRET=your-jwt-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# App Config
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Tareq Blogs
NEXT_PUBLIC_APP_DESCRIPTION=A modern blog platform
NEXT_PUBLIC_APP_AUTHOR=Tareq
NEXT_PUBLIC_APP_THEME_COLOR=#020817
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_NODE_ENV=development

# Analytics (optional)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=verification-code
```

4. **Run the development server**

```bash
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command             | Description               |
| ------------------- | ------------------------- |
| `yarn dev`          | Start development server  |
| `yarn build`        | Build for production      |
| `yarn start`        | Start production server   |
| `yarn lint`         | Run ESLint                |
| `yarn format`       | Format code with Prettier |
| `yarn check-format` | Check code formatting     |

## 🗄️ Database Models

### User

- `name`, `email`, `image`
- `role`: ADMIN, WRITER, READER

### Blog

- `title`, `slug`, `content`
- `coverImage`, `tags`
- `status`: DRAFT, PUBLISHED, ARCHIVED
- `views`, `isFeatured`
- Relations: `author`, `category`

### Category

- `name`, `description`, `icon`
- `status`: ACTIVE, INACTIVE

### BlogLike

- Relations: `blog`, `user`

## 🔐 Authentication

The app uses Google OAuth via NextAuth v5:

1. Users sign in with their Google account
2. On first login, a user record is created
3. JWT tokens manage sessions
4. Role-based access controls admin features

## 📂 API Endpoints

| Method   | Endpoint              | Description     |
| -------- | --------------------- | --------------- |
| `GET`    | `/api/blogs`          | List all blogs  |
| `GET`    | `/api/blogs/:id`      | Get blog by ID  |
| `POST`   | `/api/blogs`          | Create blog     |
| `PUT`    | `/api/blogs/:id`      | Update blog     |
| `DELETE` | `/api/blogs/:id`      | Delete blog     |
| `POST`   | `/api/blogs/:id/like` | Toggle like     |
| `POST`   | `/api/blogs/:id/view` | Increment views |
| `GET`    | `/api/categories`     | List categories |
| `POST`   | `/api/categories`     | Create category |
| `PUT`    | `/api/categories/:id` | Update category |
| `DELETE` | `/api/categories/:id` | Delete category |

## 🎨 Customization

### Theme Colors

Edit CSS variables in `styles/globals.css`:

```css
:root {
  --primary: #3b82f6;
  --background: #ffffff;
  --foreground: #020817;
}

.dark {
  --background: #020817;
  --foreground: #ffffff;
}
```

### App Configuration

Update constants in `constant/app.constant.ts` or via environment variables.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["yarn", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Tareq**

- Website: [tareqnmd.com](https://tareqnmd.com)
- GitHub: [@tareqnmd](https://github.com/tareqnmd)

---

<p align="center">
  Made with ❤️ by Tareq
</p>
