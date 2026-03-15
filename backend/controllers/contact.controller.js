class ContactController {
  constructor(contactService) {
    this.contactService = contactService;
  }

  create = async (req, res) => {
    const result = await this.contactService.createContactSubmission(req.body);
    res.status(201).json(result);
  };

  list = async (req, res) => {
    const submissions = await this.contactService.listContactSubmissions(req.query.limit);
    res.json({ items: submissions });
  };
}

export { ContactController };
