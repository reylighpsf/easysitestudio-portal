class HealthController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  check = async (_req, res) => {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
      });
    } catch {
      res.json({
        status: "offline",
        timestamp: new Date().toISOString(),
      });
    }
  };
}

export { HealthController };
