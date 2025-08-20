-- AlterTable
ALTER TABLE "trainer_profiles" ALTER COLUMN "experience" DROP NOT NULL,
ALTER COLUMN "experience" DROP DEFAULT,
ALTER COLUMN "experience" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "experience" SET DATA TYPE TEXT;
