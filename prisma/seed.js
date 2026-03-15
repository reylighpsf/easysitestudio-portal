import "dotenv/config";
import bcrypt from "bcryptjs";
import prismaClientPackage from "@prisma/client";
import { defaultSiteConfig } from "../backend/constants/site-config.constants.js";
import { defaultPortfolioProducts } from "../backend/constants/portfolio-product.constants.js";
import { defaultPricePlans } from "../backend/constants/price-plan.constants.js";

const { PrismaClient } = prismaClientPackage;
const prisma = new PrismaClient();

async function main() {
  const adminId = (process.env.ADMIN_DEFAULT_ID ?? "admin").trim();
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD ?? "admin12345";
  const adminName = (process.env.ADMIN_DEFAULT_NAME ?? "Administrator").trim();
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: defaultSiteConfig,
    create: { id: 1, ...defaultSiteConfig },
  });

  await prisma.user.upsert({
    where: { loginId: adminId },
    update: {
      name: adminName,
      passwordHash,
      role: "ADMIN",
    },
    create: {
      loginId: adminId,
      name: adminName,
      passwordHash,
      role: "ADMIN",
    },
  });

  const portfolioProductCount = await prisma.portfolioProduct.count();
  if (portfolioProductCount === 0) {
    const portfolioSeedData = defaultPortfolioProducts.map(({ id: _id, ...item }) => item);
    await prisma.portfolioProduct.createMany({
      data: portfolioSeedData,
    });
  }

  const pricePlanCount = await prisma.pricePlan.count();
  if (pricePlanCount === 0) {
    const pricePlanSeedData = defaultPricePlans.map(({ id: _id, ...item }) => item);
    await prisma.pricePlan.createMany({
      data: pricePlanSeedData,
    });
  }

  console.log(`Admin seeded: id="${adminId}"`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Prisma seed completed.");
  })
  .catch(async (error) => {
    console.error("Prisma seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
