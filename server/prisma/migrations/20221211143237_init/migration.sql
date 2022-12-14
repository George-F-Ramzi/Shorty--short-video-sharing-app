/*
  Warnings:

  - You are about to alter the column `photo` on the `user` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `thumbnail` on the `video` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `photo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `video` MODIFY `thumbnail` VARCHAR(191) NOT NULL;
