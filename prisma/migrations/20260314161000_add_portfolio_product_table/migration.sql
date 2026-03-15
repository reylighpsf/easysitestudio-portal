-- CreateTable
CREATE TABLE "PortfolioProduct" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "category" VARCHAR(80) NOT NULL,
    "gradientFrom" VARCHAR(20) NOT NULL,
    "gradientTo" VARCHAR(20) NOT NULL,
    "projectUrl" VARCHAR(512),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PortfolioProduct_isActive_sortOrder_createdAt_idx"
ON "PortfolioProduct"("isActive", "sortOrder", "createdAt");
