import { prisma } from "./config/prisma.js";
import { AdminController } from "./controllers/admin.controller.js";
import { ContactController } from "./controllers/contact.controller.js";
import { HealthController } from "./controllers/health.controller.js";
import { PortfolioProductController } from "./controllers/portfolio-product.controller.js";
import { PricePlanController } from "./controllers/price-plan.controller.js";
import { SiteConfigController } from "./controllers/site-config.controller.js";
import { ContactRepository } from "./repositories/contact.repository.js";
import { PortfolioProductRepository } from "./repositories/portfolio-product.repository.js";
import { PricePlanRepository } from "./repositories/price-plan.repository.js";
import { SiteConfigRepository } from "./repositories/site-config.repository.js";
import { UserRepository } from "./repositories/user.repository.js";
import { AdminAuthService } from "./services/admin-auth.service.js";
import { AdminService } from "./services/admin.service.js";
import { ContactService } from "./services/contact.service.js";
import { PortfolioProductService } from "./services/portfolio-product.service.js";
import { PricePlanService } from "./services/price-plan.service.js";
import { SiteConfigService } from "./services/site-config.service.js";

const siteConfigRepository = new SiteConfigRepository(prisma);
const contactRepository = new ContactRepository(prisma);
const portfolioProductRepository = new PortfolioProductRepository(prisma);
const pricePlanRepository = new PricePlanRepository(prisma);
const userRepository = new UserRepository(prisma);

const siteConfigService = new SiteConfigService(siteConfigRepository);
const contactService = new ContactService(contactRepository);
const portfolioProductService = new PortfolioProductService(portfolioProductRepository);
const pricePlanService = new PricePlanService(pricePlanRepository);
const adminAuthService = new AdminAuthService(userRepository);
const adminService = new AdminService(
  contactService,
  adminAuthService,
  portfolioProductService,
  pricePlanService,
);

const siteConfigController = new SiteConfigController(siteConfigService);
const contactController = new ContactController(contactService);
const portfolioProductController = new PortfolioProductController(portfolioProductService);
const pricePlanController = new PricePlanController(pricePlanService);
const adminController = new AdminController(adminService);
const healthController = new HealthController(prisma);

export {
  adminController,
  contactController,
  healthController,
  portfolioProductController,
  pricePlanController,
  siteConfigController,
};
