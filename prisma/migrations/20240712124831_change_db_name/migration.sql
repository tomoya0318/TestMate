/*
  Warnings:

  - You are about to drop the column `intorduce` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "intorduce",
ADD COLUMN     "introduce" TEXT;
