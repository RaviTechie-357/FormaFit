<<<<<<< HEAD
# FormaFit - GYM Application

A comprehensive web application that connects fitness trainers with clients, enabling booking, reviews, and goal tracking.

## 🚀 Features

### Core Features
- **User Authentication**: JWT-based authentication with role-based access
- **Trainer Profiles**: Detailed profiles with experience, skills, ratings, and availability
- **Client Dashboard**: Browse trainers, book sessions, and track goals
- **Booking System**: Real-time booking with status management
- **Reviews & Ratings**: Authentic reviews from real clients
- **Goal Tracking**: Set and monitor fitness goals with progress tracking
- **Responsive Design**: Modern UI that works on all devices

### User Roles
- **Admin**: Manage users, view analytics, and system administration
- **Trainer**: Create profiles, manage availability, handle bookings
- **Client**: Browse trainers, book sessions, track goals

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Hook Form** with Zod validation
- **Lucide React** for icons

### Backend
- **Next.js API Routes** for backend functionality
- **Prisma ORM** for database operations
- **PostgreSQL** database
- **JWT** for authentication
- **bcryptjs** for password hashing

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type checking
- **Prisma Studio** for database management

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd FormaFit/formafit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the `formafit` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/formafit"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="FormaFit"
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio
npm run db:studio
```

### 5. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
formafit/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── trainers/       # Trainer endpoints
│   │   │   ├── bookings/       # Booking endpoints
│   │   │   └── reviews/        # Review endpoints
│   │   ├── auth/               # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── client/
│   │   │   ├── trainer/
│   │   │   └── admin/
│   │   ├── find-trainer/       # Trainer search
│   │   ├── components/         # Reusable components
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── lib/                    # Utility functions
│   │   ├── auth.ts            # Authentication utilities
│   │   ├── db.ts              # Database connection
│   │   └── utils.ts           # General utilities
│   ├── redux/                  # State management
│   │   ├── store.ts           # Redux store
│   │   └── slices/            # Redux slices
│   └── types/                  # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                     # Static assets
└── package.json
```

## 🔧 Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: Authentication and basic user information
- **TrainerProfiles**: Detailed trainer information and skills
- **ClientProfiles**: Client preferences and fitness goals
- **Bookings**: Session bookings with status tracking
- **Reviews**: Client reviews and ratings
- **Notifications**: System notifications
- **Subscriptions**: Package subscriptions
- **Availability**: Trainer availability schedules
- **Messages**: Chat functionality
- **Goals**: Client fitness goals
- **Payments**: Payment tracking

## 🎯 Key Features Implementation

### Authentication System
- JWT-based authentication
- Role-based access control
- Secure password hashing
- Token refresh mechanism

### Trainer Management
- Profile creation and editing
- Skills and certifications
- Availability management
- Rating and review system

### Booking System
- Real-time availability checking
- Booking confirmation workflow
- Status management (pending, confirmed, cancelled, completed)
- Payment integration ready

### Client Features
- Trainer search and filtering
- Booking management
- Goal setting and tracking
- Review system

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation with Zod
- CORS protection
- Rate limiting ready
- SQL injection protection via Prisma

## 🚀 Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters

---

**FormaFit** - Transform your fitness journey with professional guidance! 💪
=======
# FormaFit
A full-stack gym application for trainers and clients built with Next.js, TypeScript, and Tailwind CSS
>>>>>>> 89be157 (Initial commit)
