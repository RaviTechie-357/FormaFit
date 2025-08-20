#!/bin/bash

echo "🚀 Setting up PostgreSQL for FormaFit..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Start PostgreSQL with Docker
echo "📦 Starting PostgreSQL container..."
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

# Create .env.local file
echo "📝 Creating .env.local file..."
cat > .env.local << EOF
DATABASE_URL="postgresql://formafit_user:formafit_pass@localhost:5432/formafit?schema=public"
EOF

# Install dependencies and setup database
echo "📥 Installing dependencies..."
npm install

echo "🔧 Setting up database..."
npm run db:generate
npm run db:push

echo "✅ PostgreSQL setup complete!"
echo "🌐 You can now run: npm run dev"
echo "📊 Database GUI: npm run db:studio"
