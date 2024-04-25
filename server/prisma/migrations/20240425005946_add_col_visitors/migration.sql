/*
  Warnings:

  - Added the required column `url` to the `companys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `visitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companys" ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "visitors" ADD COLUMN     "url" TEXT NOT NULL;
