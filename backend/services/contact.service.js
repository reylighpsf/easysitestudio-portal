import { HttpError } from "../utils/http-error.js";

class ContactService {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async createContactSubmission(payload) {
    try {
      const submission = await this.contactRepository.createContactSubmission(payload);

      return {
        success: true,
        id: submission.id,
        receivedAt: submission.createdAt.toISOString(),
      };
    } catch {
      throw new HttpError(503, "database unavailable");
    }
  }

  async listContactSubmissions(limitValue) {
    const parsedValue = Number.parseInt(limitValue ?? "50", 10);
    const limit = Number.isNaN(parsedValue) ? 50 : Math.min(Math.max(parsedValue, 1), 200);

    try {
      return await this.contactRepository.findContactSubmissions(limit);
    } catch {
      throw new HttpError(503, "database unavailable");
    }
  }
}

export { ContactService };
