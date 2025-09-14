-- CreateEnum
CREATE TYPE "public"."Citys" AS ENUM ('Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other');

-- CreateEnum
CREATE TYPE "public"."PropertyTypes" AS ENUM ('Apartment', 'Villa', 'Plot', 'Office', 'Retail');

-- CreateEnum
CREATE TYPE "public"."Bhksize" AS ENUM ('One', 'Two', 'Three', 'Four', 'Studio');

-- CreateEnum
CREATE TYPE "public"."Purposes" AS ENUM ('Buy', 'Rent');

-- CreateEnum
CREATE TYPE "public"."Timelines" AS ENUM ('ZerotoThree', 'ThreetoSix', 'GreaterthanSix', 'Exploring');

-- CreateEnum
CREATE TYPE "public"."Sources" AS ENUM ('Website', 'Referral', 'Walkin', 'Call', 'Other');

-- CreateEnum
CREATE TYPE "public"."StatusType" AS ENUM ('New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Buyer" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "city" "public"."Citys" NOT NULL,
    "propertyType" "public"."PropertyTypes" NOT NULL,
    "bhk" "public"."Bhksize",
    "purpose" "public"."Purposes" NOT NULL,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "timeline" "public"."Timelines" NOT NULL,
    "source" "public"."Sources" NOT NULL,
    "status" "public"."StatusType" NOT NULL DEFAULT 'New',
    "notes" TEXT,
    "ownerId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Buyerhistory" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL,
    "diff" TEXT NOT NULL,

    CONSTRAINT "Buyerhistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Buyer_phone_idx" ON "public"."Buyer"("phone");

-- CreateIndex
CREATE INDEX "Buyer_city_idx" ON "public"."Buyer"("city");

-- AddForeignKey
ALTER TABLE "public"."Buyer" ADD CONSTRAINT "Buyer_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Buyerhistory" ADD CONSTRAINT "Buyerhistory_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Buyerhistory" ADD CONSTRAINT "Buyerhistory_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
