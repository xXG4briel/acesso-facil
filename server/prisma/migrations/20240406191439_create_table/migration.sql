-- CreateEnum
CREATE TYPE "Identity" AS ENUM ('cnpj', 'cpf');

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "fullName" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "birthday" DATE NOT NULL,
    "identity" VARCHAR(14) NOT NULL,
    "identityType" "Identity" NOT NULL DEFAULT 'cnpj',
    "address" JSONB NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companys" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "identity" VARCHAR(14) NOT NULL,
    "identityType" "Identity" NOT NULL DEFAULT 'cnpj',
    "address" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companys_email_key" ON "companys"("email");
