class AdminService {
  constructor(contactService, adminAuthService, portfolioProductService, pricePlanService) {
    this.contactService = contactService;
    this.adminAuthService = adminAuthService;
    this.portfolioProductService = portfolioProductService;
    this.pricePlanService = pricePlanService;
  }

  listContactSubmissions(limit) {
    return this.contactService.listContactSubmissions(limit);
  }

  login(payload) {
    return this.adminAuthService.login(payload);
  }

  listPortfolioProducts() {
    return this.portfolioProductService.listAdminProducts();
  }

  createPortfolioProduct(payload) {
    return this.portfolioProductService.createProduct(payload);
  }

  updatePortfolioProduct(id, payload) {
    return this.portfolioProductService.updateProduct(id, payload);
  }

  deletePortfolioProduct(id) {
    return this.portfolioProductService.deleteProduct(id);
  }

  listPricePlans() {
    return this.pricePlanService.listAdminPlans();
  }

  createPricePlan(payload) {
    return this.pricePlanService.createPlan(payload);
  }

  updatePricePlan(id, payload) {
    return this.pricePlanService.updatePlan(id, payload);
  }

  deletePricePlan(id) {
    return this.pricePlanService.deletePlan(id);
  }
}

export { AdminService };
