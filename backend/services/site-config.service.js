import { defaultSiteConfig } from "../constants/site-config.constants.js";
import { HttpError } from "../utils/http-error.js";

class SiteConfigService {
  constructor(siteConfigRepository) {
    this.siteConfigRepository = siteConfigRepository;
  }

  async getSiteConfig() {
    try {
      return await this.siteConfigRepository.upsertSiteConfig();
    } catch {
      return defaultSiteConfig;
    }
  }

  async updateSiteConfig(payload) {
    try {
      return await this.siteConfigRepository.saveSiteConfig(payload);
    } catch {
      throw new HttpError(503, "database unavailable");
    }
  }
}

export { SiteConfigService };
