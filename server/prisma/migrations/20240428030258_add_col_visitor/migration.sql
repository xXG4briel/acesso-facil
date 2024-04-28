/*
  Warnings:

  - Added the required column `phone` to the `visitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `visitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `visits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visitors" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "visits" ADD COLUMN     "description" TEXT NOT NULL;
