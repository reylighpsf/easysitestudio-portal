import { portfolioProductSelect } from "../constants/portfolio-product.constants.js";

class PortfolioProductRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findPublicProducts() {
    return this.prisma.portfolioProduct.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: portfolioProductSelect,
    });
  }

  findAdminProducts() {
    return this.prisma.portfolioProduct.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: portfolioProductSelect,
    });
  }

  createProduct(data) {
    return this.prisma.portfolioProduct.create({
      data,
      select: portfolioProductSelect,
    });
  }

  findProductById(id) {
    return this.prisma.portfolioProduct.findUnique({
      where: { id },
      select: {
        id: true,
        imageUrl: true,
        galleryImages: true,
      },
    });
  }

  updateProduct(id, data) {
    return this.prisma.portfolioProduct.update({
      where: { id },
      data,
      select: portfolioProductSelect,
    });
  }

  deleteProduct(id) {
    return this.prisma.portfolioProduct.delete({
      where: { id },
      select: { id: true },
    });
  }
}

export { PortfolioProductRepository };
