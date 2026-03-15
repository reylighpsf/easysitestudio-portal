class PricePlanController {
  constructor(pricePlanService) {
    this.pricePlanService = pricePlanService;
  }

  list = async (_req, res) => {
    const items = await this.pricePlanService.listPublicPlans();
    res.json({ items });
  };
}

export { PricePlanController };
