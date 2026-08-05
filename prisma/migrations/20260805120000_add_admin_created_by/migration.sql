-- AlterTable
ALTER TABLE `AdminUser`
    ADD COLUMN `createdById` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `AdminUser_createdById_idx` ON `AdminUser`(`createdById`);

-- AddForeignKey
ALTER TABLE `AdminUser`
    ADD CONSTRAINT `AdminUser_createdById_fkey`
    FOREIGN KEY (`createdById`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;