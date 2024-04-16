/*
  Warnings:

  - You are about to drop the column `userId` on the `Settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orgId]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgId` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Settings_userId_key";

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "userId",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Settings_orgId_key" ON "Settings"("orgId");
