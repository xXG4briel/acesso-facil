-- AlterTable
ALTER TABLE "visits" ADD COLUMN     "approved" BOOLEAN,
ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rejected" BOOLEAN;
