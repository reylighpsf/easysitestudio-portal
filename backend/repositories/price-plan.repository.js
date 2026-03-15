import { pricePlanSelect } from "../constants/price-plan.constants.js";

class PricePlanRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findPublicPlans() {
    return this.prisma.pricePlan.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: pricePlanSelect,
    });
  }

  findAdminPlans() {
    return this.prisma.pricePlan.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: pricePlanSelect,
    });
  }

  createPlan(data) {
    return this.prisma.pricePlan.create({
      data,
      select: pricePlanSelect,
    });
  }

  findPlanById(id) {
    return this.prisma.pricePlan.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  updatePlan(id, data) {
    return this.prisma.pricePlan.update({
      where: { id },
      data,
      select: pricePlanSelect,
    });
  }

  deletePlan(id) {
    return this.prisma.pricePlan.delete({
      where: { id },
      select: { id: true },
    });
  }
}

export { PricePlanRepository };
