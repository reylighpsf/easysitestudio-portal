import { HttpError } from "../utils/http-error.js";

const isPrismaNotFoundError = (error) => error?.code === "P2025";

class PricePlanService {
  constructor(pricePlanRepository) {
    this.pricePlanRepository = pricePlanRepository;
  }

  normalizePayload(payload) {
    const normalizedPayload = { ...payload };
    if (Object.hasOwn(payload, "name")) {
      normalizedPayload.name = payload.name.trim();
    }
    if (Object.hasOwn(payload, "features")) {
      normalizedPayload.features = payload.features.trim();
    }

    return normalizedPayload;
  }

  async listPublicPlans() {
    try {
      return await this.pricePlanRepository.findPublicPlans();
    } catch {
      throw new HttpError(503, "database unavailable");
    }
  }

  async listAdminPlans() {
    try {
      return await this.pricePlanRepository.findAdminPlans();
    } catch {
      throw new HttpError(503, "database unavailable");
    }
  }

  async createPlan(payload) {
    try {
      return await this.pricePlanRepository.createPlan(this.normalizePayload(payload));
    } catch {
      throw new HttpError(503, "database unavailable");
    }
  }

  async updatePlan(id, payload) {
    try {
      const currentPlan = await this.pricePlanRepository.findPlanById(id);
      if (!currentPlan) {
        throw new HttpError(404, "paket harga tidak ditemukan.");
      }

      return await this.pricePlanRepository.updatePlan(id, this.normalizePayload(payload));
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      if (isPrismaNotFoundError(error)) {
        throw new HttpError(404, "paket harga tidak ditemukan.");
      }

      throw new HttpError(503, "database unavailable");
    }
  }

  async deletePlan(id) {
    try {
      const currentPlan = await this.pricePlanRepository.findPlanById(id);
      if (!currentPlan) {
        throw new HttpError(404, "paket harga tidak ditemukan.");
      }

      await this.pricePlanRepository.deletePlan(id);
      return { success: true };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      if (isPrismaNotFoundError(error)) {
        throw new HttpError(404, "paket harga tidak ditemukan.");
      }

      throw new HttpError(503, "database unavailable");
    }
  }
}

export { PricePlanService };
