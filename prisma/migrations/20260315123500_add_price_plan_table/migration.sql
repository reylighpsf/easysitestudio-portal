CREATE TABLE "PricePlan" (
  "id" SERIAL NOT NULL,
  "name" VARCHAR(120) NOT NULL,
  "price" INTEGER NOT NULL DEFAULT 0,
  "features" TEXT NOT NULL,
  "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "PricePlan_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "PricePlan_isActive_sortOrder_createdAt_idx"
ON "PricePlan"("isActive", "sortOrder", "createdAt");
