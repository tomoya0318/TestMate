/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `googlegroupUrl` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconUrl` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeUrl` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_tagId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "googlegroupUrl" TEXT NOT NULL,
ADD COLUMN     "iconUrl" TEXT NOT NULL,
ADD COLUMN     "screenshots" TEXT[],
ADD COLUMN     "short" TEXT NOT NULL,
ADD COLUMN     "storeUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "appType" TEXT NOT NULL,
    "categories" TEXT[],
    "status" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
