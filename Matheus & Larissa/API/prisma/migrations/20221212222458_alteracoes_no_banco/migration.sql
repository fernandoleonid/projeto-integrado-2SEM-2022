/*
  Warnings:

  - You are about to drop the `teste` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `teste`;

-- CreateTable
CREATE TABLE `clear_db` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
