/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `companys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companys" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "customers";

-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "birthday" DATE NOT NULL,
    "identity" VARCHAR(14) NOT NULL,
    "identityType" "Identity" NOT NULL DEFAULT 'cnpj',
    "address" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "files" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitors_email_key" ON "visitors"("email");

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
