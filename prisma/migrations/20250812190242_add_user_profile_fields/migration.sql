-- AlterTable
ALTER TABLE "users" ADD COLUMN     "description" TEXT,
ADD COLUMN     "documentation" TEXT[],
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "rate" DOUBLE PRECISION;
