/*
  Warnings:

  - The values [SUPERADMIN] on the enum `Role_name` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Permission` MODIFY `name` ENUM('READ', 'WRITE', 'UPDATE', 'DELETE', 'EXECUTE', 'MANAGE') NOT NULL;

-- AlterTable
ALTER TABLE `Role` MODIFY `name` ENUM('ADMIN', 'USER', 'MANAGER', 'GUEST', 'EDITOR', 'VIEWER') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Permission_name_key` ON `Permission`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Role_name_key` ON `Role`(`name`);
