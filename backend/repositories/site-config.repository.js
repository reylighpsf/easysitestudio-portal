import {
  defaultSiteConfig,
  siteConfigSelect,
} from "../constants/site-config.constants.js";

const SITE_CONFIG_ID = 1;

class SiteConfigRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  upsertSiteConfig() {
    return this.prisma.siteConfig.upsert({
      where: { id: SITE_CONFIG_ID },
      create: { id: SITE_CONFIG_ID, ...defaultSiteConfig },
      update: {},
      select: siteConfigSelect,
    });
  }

  saveSiteConfig(data) {
    return this.prisma.siteConfig.upsert({
      where: { id: SITE_CONFIG_ID },
      create: { id: SITE_CONFIG_ID, ...defaultSiteConfig, ...data },
      update: data,
      select: siteConfigSelect,
    });
  }
}

export { SiteConfigRepository };
