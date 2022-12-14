-- CreateIndex
CREATE FULLTEXT INDEX `user_username_idx` ON `user`(`username`);

-- CreateIndex
CREATE FULLTEXT INDEX `video_details_idx` ON `video`(`details`);
