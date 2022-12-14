/*
  Warnings:

  - You are about to drop the `tbl_drink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_drink_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_like_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_pizza` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_pizza_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_pizza_stuffing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_pizza_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_product_pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_product_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_sale_off` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_sale_off_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_stuffing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_drink` DROP FOREIGN KEY `FK_product_drink`;

-- DropForeignKey
ALTER TABLE `tbl_like_product` DROP FOREIGN KEY `FK_product_like`;

-- DropForeignKey
ALTER TABLE `tbl_pizza` DROP FOREIGN KEY `FK_pizza_type_pizza`;

-- DropForeignKey
ALTER TABLE `tbl_pizza` DROP FOREIGN KEY `FK_product_pizza`;

-- DropForeignKey
ALTER TABLE `tbl_pizza_ingredient` DROP FOREIGN KEY `FK_ingredient_pizza_ingredient`;

-- DropForeignKey
ALTER TABLE `tbl_pizza_ingredient` DROP FOREIGN KEY `FK_pizza_pizza_ingredient`;

-- DropForeignKey
ALTER TABLE `tbl_pizza_stuffing` DROP FOREIGN KEY `FK_pizza_pizza_stugging`;

-- DropForeignKey
ALTER TABLE `tbl_pizza_stuffing` DROP FOREIGN KEY `FK_stuffing_pizza_stugging`;

-- DropForeignKey
ALTER TABLE `tbl_product` DROP FOREIGN KEY `FK_status_product`;

-- DropForeignKey
ALTER TABLE `tbl_product` DROP FOREIGN KEY `FK_user_product`;

-- DropForeignKey
ALTER TABLE `tbl_product_pictures` DROP FOREIGN KEY `FK_picture_product_pictures`;

-- DropForeignKey
ALTER TABLE `tbl_product_pictures` DROP FOREIGN KEY `FK_product_product_pictures`;

-- DropForeignKey
ALTER TABLE `tbl_sale_off_products` DROP FOREIGN KEY `FK_product_sale_off_products`;

-- DropForeignKey
ALTER TABLE `tbl_sale_off_products` DROP FOREIGN KEY `FK_sale_off_sale_off_products`;

-- DropTable
DROP TABLE `tbl_drink`;

-- DropTable
DROP TABLE `tbl_drink_type`;

-- DropTable
DROP TABLE `tbl_ingredient`;

-- DropTable
DROP TABLE `tbl_like_product`;

-- DropTable
DROP TABLE `tbl_message`;

-- DropTable
DROP TABLE `tbl_picture`;

-- DropTable
DROP TABLE `tbl_pizza`;

-- DropTable
DROP TABLE `tbl_pizza_ingredient`;

-- DropTable
DROP TABLE `tbl_pizza_stuffing`;

-- DropTable
DROP TABLE `tbl_pizza_type`;

-- DropTable
DROP TABLE `tbl_product`;

-- DropTable
DROP TABLE `tbl_product_pictures`;

-- DropTable
DROP TABLE `tbl_product_status`;

-- DropTable
DROP TABLE `tbl_sale_off`;

-- DropTable
DROP TABLE `tbl_sale_off_products`;

-- DropTable
DROP TABLE `tbl_stuffing`;

-- DropTable
DROP TABLE `tbl_user`;

-- CreateTable
CREATE TABLE `drink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `volume` INTEGER NOT NULL,
    `product_id` INTEGER NULL,
    `drink_type_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_drink_type_drink`(`drink_type_id`),
    INDEX `FK_product_drink`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drink_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingrendient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `likes` INTEGER NULL,
    `product_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_product_like`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `phone` VARCHAR(13) NOT NULL,
    `cellphone` VARCHAR(15) NOT NULL,
    `critica` BOOLEAN NOT NULL,
    `content` TEXT NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `picture_link` VARCHAR(256) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `pizza_type` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_pizza_type_pizza`(`pizza_type`),
    INDEX `FK_product_pizza`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pizza_ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_id` INTEGER NULL,
    `pizza_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_ingredient_pizza_ingredient`(`ingredient_id`),
    INDEX `FK_pizza_pizza_ingredient`(`pizza_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pizza_stuffing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pizza_id` INTEGER NULL,
    `stuffing_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_pizza_pizza_stugging`(`pizza_id`),
    INDEX `FK_stuffing_pizza_stugging`(`stuffing_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pizza_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `dimensions` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `created_by` INTEGER NOT NULL,
    `status_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_status_product`(`status_id`),
    INDEX `FK_user_product`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_pictures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `picture_id` INTEGER NULL,

    INDEX `FK_picture_product_pictures`(`picture_id`),
    INDEX `FK_product_product_pictures`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `updated_by` INTEGER NOT NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sale_off` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `off_value` DECIMAL(10, 2) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sale_off_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `sale_off` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_product_sale_off_products`(`product_id`),
    INDEX `FK_sale_off_sale_off_products`(`sale_off`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stuffing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `phone` VARCHAR(13) NOT NULL,
    `cellphone` VARCHAR(15) NOT NULL,
    `profile_picture` VARCHAR(256) NULL,
    `password` VARCHAR(256) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,

    UNIQUE INDEX `email`(`email`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `drink` ADD CONSTRAINT `FK_product_drink` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_likes` ADD CONSTRAINT `FK_product_like` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pizza` ADD CONSTRAINT `FK_pizza_type_pizza` FOREIGN KEY (`pizza_type`) REFERENCES `pizza_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pizza` ADD CONSTRAINT `FK_product_pizza` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pizza_ingredient` ADD CONSTRAINT `FK_ingredient_pizza_ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `ingrendient`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pizza_ingredient` ADD CONSTRAINT `FK_pizza_pizza_ingredient` FOREIGN KEY (`pizza_id`) REFERENCES `pizza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pizza_stuffing` ADD CONSTRAINT `FK_pizza_pizza_stugging` FOREIGN KEY (`pizza_id`) REFERENCES `pizza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pizza_stuffing` ADD CONSTRAINT `FK_stuffing_pizza_stugging` FOREIGN KEY (`stuffing_id`) REFERENCES `stuffing`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `FK_status_product` FOREIGN KEY (`status_id`) REFERENCES `product_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `FK_user_product` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_pictures` ADD CONSTRAINT `FK_picture_product_pictures` FOREIGN KEY (`picture_id`) REFERENCES `picture`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_pictures` ADD CONSTRAINT `FK_product_product_pictures` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale_off_products` ADD CONSTRAINT `FK_product_sale_off_products` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale_off_products` ADD CONSTRAINT `FK_sale_off_sale_off_products` FOREIGN KEY (`sale_off`) REFERENCES `sale_off`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
