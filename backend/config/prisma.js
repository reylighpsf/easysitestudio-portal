import prismaClientPackage from "@prisma/client";
import { NODE_ENV } from "./env.js";

const { PrismaClient } = prismaClientPackage;
const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };
