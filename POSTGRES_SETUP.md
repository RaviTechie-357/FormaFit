# PostgreSQL Setup Guide for FormaFit Project

## Quick Setup Options

### Option 1: Docker (Recommended)
```bash
# Install Docker Desktop first
docker run --name formafit-postgres \
  -e POSTGRES_PASSWORD=formafit123 \
  -e POSTGRES_DB=formafit \
  -p 5432:5432 \
  -d postgres:15
```

### Option 2: Local Installation
```bash
# Windows
choco install postgresql

# macOS
brew install postgresql
brew services start postgresql

# Linux
sudo apt install postgresql postgresql-contrib
```

### Option 3: Cloud (Supabase)
1. Visit https://supabase.com
2. Create new project
3. Copy connection string

## Database Configuration

### 1. Create .env.local file
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/formafit?schema=public"
```

### 2. Setup Database
```bash
npm install
npm run db:generate
npm run db:push
npm run db:studio  # Optional: GUI for database
```

### 3. Verify Connection
```bash
npm run dev
```

## Database Schema
The project uses Prisma with PostgreSQL and includes:
- Users (Admin, Trainer, Client roles)
- Trainer/Client profiles
- Bookings system
- Reviews & ratings
- Subscriptions
- Notifications
- Payment tracking

## Common Commands
- `npm run db:push` - Push schema changes
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database
- `npm run db:seed` - Seed with sample data

## Troubleshooting
- Check PostgreSQL service is running
- Verify port 5432 is available
- Ensure correct credentials in .env.local
- Run `npx prisma db reset` if needed
