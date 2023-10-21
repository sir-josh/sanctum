/*
  Warnings:

  - A unique constraint covering the columns `[deadline]` on the table `campaigns` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deadline` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "deadline" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_deadline_key" ON "campaigns"("deadline");
