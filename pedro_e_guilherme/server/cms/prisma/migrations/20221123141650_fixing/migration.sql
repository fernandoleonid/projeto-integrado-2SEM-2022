/*
  Warnings:

  - You are about to drop the `drink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `drink_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingrendient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pizza` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pizza_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pizza_stuffing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pizza_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_off` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_off_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stuffing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `drink` DROP FOREIGN KEY `FK_product_drink`;

-- DropForeignKey
ALTER TABLE `pizza` DROP FOREIGN KEY `FK_pizza_type_pizza`;

-- DropForeignKey
ALTER TABLE `pizza` DROP FOREIGN KEY `FK_product_pizza`;

-- DropForeignKey
ALTER TABLE `pizza_ingredient` DROP FOREIGN KEY `FK_ingredient_pizza_ingredient`;

-- DropForeignKey
ALTER TABLE `pizza_ingredient` DROP FOREIGN KEY `FK_pizza_pizza_ingredient`;

-- DropForeignKey
ALTER TABLE `pizza_stuffing` DROP FOREIGN KEY `FK_pizza_pizza_stugging`;

-- DropForeignKey
ALTER TABLE `pizza_stuffing` DROP FOREIGN KEY `FK_stuffing_pizza_stugging`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `FK_status_product`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `FK_user_product`;

-- DropForeignKey
ALTER TABLE `product_likes` DROP FOREIGN KEY `FK_product_like`;

-- DropForeignKey
ALTER TABLE `product_pictures` DROP FOREIGN KEY `FK_picture_product_pictures`;

-- DropForeignKey
ALTER TABLE `product_pictures` DROP FOREIGN KEY `FK_product_product_pictures`;

-- DropForeignKey
ALTER TABLE `sale_off_products` DROP FOREIGN KEY `FK_product_sale_off_products`;

-- DropForeignKey
ALTER TABLE `sale_off_products` DROP FOREIGN KEY `FK_sale_off_sale_off_products`;

-- DropTable
DROP TABLE `drink`;

-- DropTable
DROP TABLE `drink_type`;

-- DropTable
DROP TABLE `ingrendient`;

-- DropTable
DROP TABLE `message`;

-- DropTable
DROP TABLE `picture`;

-- DropTable
DROP TABLE `pizza`;

-- DropTable
DROP TABLE `pizza_ingredient`;

-- DropTable
DROP TABLE `pizza_stuffing`;

-- DropTable
DROP TABLE `pizza_type`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `product_likes`;

-- DropTable
DROP TABLE `product_pictures`;

-- DropTable
DROP TABLE `product_status`;

-- DropTable
DROP TABLE `sale_off`;

-- DropTable
DROP TABLE `sale_off_products`;

-- DropTable
DROP TABLE `stuffing`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `tbl_drink` (
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
CREATE TABLE `tbl_drink_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ingrendient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_product_likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `likes` INTEGER NULL,
    `product_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_product_like`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_message` (
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
CREATE TABLE `tbl_picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `picture_link` VARCHAR(256) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `pizza_type_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_pizza_type_pizza`(`pizza_type_id`),
    INDEX `FK_product_pizza`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza_ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_id` INTEGER NULL,
    `pizza_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_ingredient_pizza_ingredient`(`ingredient_id`),
    INDEX `FK_pizza_pizza_ingredient`(`pizza_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza_stuffing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pizza_id` INTEGER NULL,
    `stuffing_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_pizza_pizza_stugging`(`pizza_id`),
    INDEX `FK_stuffing_pizza_stugging`(`stuffing_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pizza_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `dimensions` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_product` (
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
CREATE TABLE `tbl_product_pictures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `picture_id` INTEGER NULL,

    INDEX `FK_picture_product_pictures`(`picture_id`),
    INDEX `FK_product_product_pictures`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_product_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `updated_by` INTEGER NOT NULL,
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_sale_off` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `off_value` DECIMAL(10, 2) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_sale_off_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NULL,
    `sale_off_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_product_sale_off_products`(`product_id`),
    INDEX `FK_sale_off_sale_off_products`(`sale_off_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_stuffing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(256) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_user` (
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
ALTER TABLE `tbl_drink` ADD CONSTRAINT `FK_product_drink` FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_product_likes` ADD CONSTRAINT `FK_product_like` FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizza` ADD CONSTRAINT `FK_pizza_type_pizza` FOREIGN KEY (`pizza_type_id`) REFERENCES `tbl_pizza_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizza` ADD CONSTRAINT `FK_product_pizza` FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizza_ingredient` ADD CONSTRAINT `FK_ingredient_pizza_ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `tbl_ingrendient`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizza_ingredient` ADD CONSTRAINT `FK_pizza_pizza_ingredient` FOREIGN KEY (`pizza_id`) REFERENCES `tbl_pizza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizza_stuffing` ADD CONSTRAINT `FK_pizza_pizza_stugging` FOREIGN KEY (`pizza_id`) REFERENCES `tbl_pizza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_pizza_stuffing` ADD CONSTRAINT `FK_stuffing_pizza_stugging` FOREIGN KEY (`stuffing_id`) REFERENCES `tbl_stuffing`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_product` ADD CONSTRAINT `FK_status_product` FOREIGN KEY (`status_id`) REFERENCES `tbl_product_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_product` ADD CONSTRAINT `FK_user_product` FOREIGN KEY (`created_by`) REFERENCES `tbl_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_product_pictures` ADD CONSTRAINT `FK_picture_product_pictures` FOREIGN KEY (`picture_id`) REFERENCES `tbl_picture`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_product_pictures` ADD CONSTRAINT `FK_product_product_pictures` FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_sale_off_products` ADD CONSTRAINT `FK_product_sale_off_products` FOREIGN KEY (`product_id`) REFERENCES `tbl_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_sale_off_products` ADD CONSTRAINT `FK_sale_off_sale_off_products` FOREIGN KEY (`sale_off_id`) REFERENCES `tbl_sale_off`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
