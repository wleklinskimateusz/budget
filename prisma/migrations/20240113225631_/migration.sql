/*
  Warnings:

  - You are about to drop the column `date` on the `AssetValue` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioAssetId` on the `AssetValue` table. All the data in the column will be lost.
  - You are about to drop the `PortfolioAsset` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assetId` to the `AssetValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `AssetValue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssetValue" DROP CONSTRAINT "AssetValue_portfolioAssetId_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioAsset" DROP CONSTRAINT "PortfolioAsset_portfolioId_fkey";

-- AlterTable
ALTER TABLE "AssetValue" DROP COLUMN "date",
DROP COLUMN "portfolioAssetId",
ADD COLUMN     "assetId" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "PortfolioAsset";

-- CreateTable
CREATE TABLE "PortfolioStructureItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "goal" DOUBLE PRECISION,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "PortfolioStructureItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "portfolioStructureItemId" TEXT NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetDeposit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "AssetDeposit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PortfolioStructureItem" ADD CONSTRAINT "PortfolioStructureItem_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_portfolioStructureItemId_fkey" FOREIGN KEY ("portfolioStructureItemId") REFERENCES "PortfolioStructureItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetDeposit" ADD CONSTRAINT "AssetDeposit_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetValue" ADD CONSTRAINT "AssetValue_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
