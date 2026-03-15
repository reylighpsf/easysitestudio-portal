class PortfolioProductController {
  constructor(portfolioProductService) {
    this.portfolioProductService = portfolioProductService;
  }

  list = async (_req, res) => {
    const items = await this.portfolioProductService.listPublicProducts();
    res.json({ items });
  };
}

export { PortfolioProductController };
