/*
  Warnings:

  - The `experience` column on the `trainer_profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `description` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `documentation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "availability" ADD COLUMN     "trainerProfileId" TEXT;

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "clientProfileId" TEXT,
ADD COLUMN     "trainerProfileId" TEXT;

-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "clientProfileId" TEXT;

-- AlterTable
ALTER TABLE "media" ADD COLUMN     "trainerProfileId" TEXT;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "clientProfileId" TEXT;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "clientProfileId" TEXT,
ADD COLUMN     "trainerProfileId" TEXT;

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "clientProfileId" TEXT;

-- AlterTable
ALTER TABLE "trainer_profiles" DROP COLUMN "experience",
ADD COLUMN     "experience" INTEGER;

-- AlterTable
ALTER TABLE "trainer_tags" ADD COLUMN     "trainerProfileId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "description",
DROP COLUMN "documentation",
DROP COLUMN "experience",
DROP COLUMN "location",
DROP COLUMN "rate";

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_trainerProfileId_fkey" FOREIGN KEY ("trainerProfileId") REFERENCES "trainer_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "client_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_trainerProfileId_fkey" FOREIGN KEY ("trainerProfileId") REFERENCES "trainer_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "client_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "client_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_trainerProfileId_fkey" FOREIGN KEY ("trainerProfileId") REFERENCES "trainer_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainer_tags" ADD CONSTRAINT "trainer_tags_trainerProfileId_fkey" FOREIGN KEY ("trainerProfileId") REFERENCES "trainer_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_trainerProfileId_fkey" FOREIGN KEY ("trainerProfileId") REFERENCES "trainer_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "client_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "client_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
