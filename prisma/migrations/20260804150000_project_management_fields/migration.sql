-- AlterTable
ALTER TABLE `Project`
    ADD COLUMN `assignedAdminId` VARCHAR(191) NULL,
    ADD COLUMN `orderedAt` DATETIME(3) NULL,
    ADD COLUMN `completedAt` DATETIME(3) NULL,
    ADD COLUMN `revisionUsed` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `revisionLimit` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `expiresAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `Project_assignedAdminId_idx` ON `Project`(`assignedAdminId`);

-- AddForeignKey
ALTER TABLE `Project`
    ADD CONSTRAINT `Project_assignedAdminId_fkey`
    FOREIGN KEY (`assignedAdminId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
