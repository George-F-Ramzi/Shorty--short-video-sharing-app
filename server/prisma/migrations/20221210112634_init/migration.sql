-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_videoId_fkey`;

-- DropForeignKey
ALTER TABLE `followers` DROP FOREIGN KEY `followers_beenFollowingId_fkey`;

-- DropForeignKey
ALTER TABLE `followers` DROP FOREIGN KEY `followers_followingId_fkey`;

-- DropForeignKey
ALTER TABLE `likedVideo` DROP FOREIGN KEY `likedVideo_userId_fkey`;

-- DropForeignKey
ALTER TABLE `likedVideo` DROP FOREIGN KEY `likedVideo_videoId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_notifierId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_triggerId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_videoId_fkey`;

-- DropForeignKey
ALTER TABLE `video` DROP FOREIGN KEY `video_userId_fkey`;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `video`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likedVideo` ADD CONSTRAINT `likedVideo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likedVideo` ADD CONSTRAINT `likedVideo_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `video`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_beenFollowingId_fkey` FOREIGN KEY (`beenFollowingId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `notificationMessage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `video`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_triggerId_fkey` FOREIGN KEY (`triggerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_notifierId_fkey` FOREIGN KEY (`notifierId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
