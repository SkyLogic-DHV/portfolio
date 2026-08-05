-- CreateTable
CREATE TABLE `ClientProject` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `clientName` VARCHAR(191) NOT NULL DEFAULT '',
    `status` VARCHAR(191) NOT NULL DEFAULT 'To Do',
    `assignedAdminId` VARCHAR(191) NULL,
    `orderedAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `revisionUsed` INTEGER NOT NULL DEFAULT 0,
    `revisionLimit` INTEGER NOT NULL DEFAULT 2,
    `expiresAt` DATETIME(3) NULL,
    `priority` VARCHAR(191) NOT NULL DEFAULT 'Medium',
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ClientProject_assignedAdminId_idx`(`assignedAdminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientProject`
    ADD CONSTRAINT `ClientProject_assignedAdminId_fkey`
    FOREIGN KEY (`assignedAdminId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;