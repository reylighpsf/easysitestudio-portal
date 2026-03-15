class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findByLoginId(loginId) {
    return this.prisma.user.findFirst({
      where: {
        loginId: {
          equals: loginId,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        loginId: true,
        name: true,
        passwordHash: true,
        role: true,
      },
    });
  }
}

export { UserRepository };
