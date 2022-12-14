/*
  Warnings:

  - Added the required column `photoId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailId` to the `video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlId` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `photoId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `video` ADD COLUMN `thumbnailId` VARCHAR(191) NOT NULL,
    ADD COLUMN `urlId` VARCHAR(191) NOT NULL;
