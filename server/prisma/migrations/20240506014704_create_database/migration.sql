-- CreateEnum
CREATE TYPE "Identity" AS ENUM ('cnpj', 'cpf');

-- CreateTable
CREATE TABLE "companys" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "identity" VARCHAR(14) NOT NULL,
    "identityType" "Identity" NOT NULL DEFAULT 'cnpj',
    "url" TEXT,
    "address" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "companys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "birthday" DATE NOT NULL,
    "identity" VARCHAR(14) NOT NULL,
    "identityType" "Identity" NOT NULL DEFAULT 'cnpj',
    "url" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "files" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "approved" BOOLEAN,
    "finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companys_email_key" ON "companys"("email");

-- CreateIndex
CREATE UNIQUE INDEX "visitors_email_key" ON "visitors"("email");

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
