/*
  Warnings:

  - You are about to drop the column `companyId` on the `visitors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_companyId_fkey";

-- AlterTable
ALTER TABLE "visitors" DROP COLUMN "companyId";
