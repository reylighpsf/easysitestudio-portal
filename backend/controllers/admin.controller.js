import { signAdminToken } from "../utils/jwt.js";

class AdminController {
  constructor(adminService) {
    this.adminService = adminService;
  }

  login = async (req, res) => {
    const admin = await this.adminService.login(req.body);
    const token = signAdminToken(admin);

    res.json({
      token,
      admin,
    });
  };

  listContacts = async (req, res) => {
    const items = await this.adminService.listContactSubmissions(req.query.limit);
    res.json({ items });
  };

  listPortfolioProducts = async (_req, res) => {
    const items = await this.adminService.listPortfolioProducts();
    res.json({ items });
  };

  createPortfolioProduct = async (req, res) => {
    const item = await this.adminService.createPortfolioProduct(req.body);
    res.status(201).json(item);
  };

  updatePortfolioProduct = async (req, res) => {
    const item = await this.adminService.updatePortfolioProduct(req.params.id, req.body);
    res.json(item);
  };

  deletePortfolioProduct = async (req, res) => {
    const result = await this.adminService.deletePortfolioProduct(req.params.id);
    res.json(result);
  };

  listPricePlans = async (_req, res) => {
    const items = await this.adminService.listPricePlans();
    res.json({ items });
  };

  createPricePlan = async (req, res) => {
    const item = await this.adminService.createPricePlan(req.body);
    res.status(201).json(item);
  };

  updatePricePlan = async (req, res) => {
    const item = await this.adminService.updatePricePlan(req.params.id, req.body);
    res.json(item);
  };

  deletePricePlan = async (req, res) => {
    const result = await this.adminService.deletePricePlan(req.params.id);
    res.json(result);
  };
}

export { AdminController };
