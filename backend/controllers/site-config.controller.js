class SiteConfigController {
  constructor(siteConfigService) {
    this.siteConfigService = siteConfigService;
  }

  get = async (_req, res) => {
    const siteConfig = await this.siteConfigService.getSiteConfig();
    res.json(siteConfig);
  };

  update = async (req, res) => {
    const updatedSiteConfig = await this.siteConfigService.updateSiteConfig(req.body);
    res.json(updatedSiteConfig);
  };
}

export { SiteConfigController };
