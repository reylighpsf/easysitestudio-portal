class ContactRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createContactSubmission(data) {
    return this.prisma.contactSubmission.create({
      data,
      select: {
        id: true,
        createdAt: true,
      },
    });
  }

  findContactSubmissions(limit) {
    return this.prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        message: true,
        createdAt: true,
      },
    });
  }
}

export { ContactRepository };
