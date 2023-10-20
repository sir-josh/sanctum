/*
  Warnings:

  - You are about to drop the column `bio` on the `organizations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[description]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "organizations_bio_key";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "bio",
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "isVerified" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_description_key" ON "organizations"("description");
