import fs from "node:fs/promises";
import path from "node:path";
import { HttpError } from "../utils/http-error.js";

const isPrismaNotFoundError = (error) => error?.code === "P2025";
const portfolioUploadPrefix = "/uploads/portfolio/";

async function removeLocalPortfolioImage(imageUrl) {
  if (!imageUrl || !imageUrl.startsWith(portfolioUploadPrefix)) {
    return;
  }

  const safeFileName = path.basename(imageUrl);
  const absolutePath = path.resolve(process.cwd(), "public", "uploads", "portfolio", safeFileName);

  try {
    await fs.unlink(absolutePath);
  } catch {
    // Abaikan jika file tidak ada atau gagal dihapus.
  }
}

async function removeLocalPortfolioImages(imageUrls) {
  const uniqueImageUrls = Array.from(
    new Set((Array.isArray(imageUrls) ? imageUrls : []).filter(Boolean)),
  );
  await Promise.all(uniqueImageUrls.map((item) => removeLocalPortfolioImage(item)));
}

function sanitizeGalleryImages(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .slice(0, 4);
}

function collectProductImageUrls(product) {
  const galleryImages = Array.isArray(product?.galleryImages) ? product.galleryImages : [];
  return [product?.imageUrl, ...galleryImages].filter(Boolean);
}

class PortfolioProductService {
  constructor(portfolioProductRepository) {
    this.portfolioProductRepository = portfolioProductRepository;
  }

  normalizePayload(payload) {
    const normalizedPayload = { ...payload };
    if (Object.hasOwn(payload, "projectUrl")) {
      normalizedPayload.projectUrl = payload.projectUrl ? payload.projectUrl.trim() : null;
    }
    if (Object.hasOwn(payload, "imageUrl")) {
      normalizedPayload.imageUrl = payload.imageUrl ? payload.imageUrl.trim() : null;
    }
    if (Object.hasOwn(payload, "galleryImages")) {
      normalizedPayload.galleryImages = sanitizeGalleryImages(payload.galleryImages);
    }

    if (Object.hasOwn(normalizedPayload, "imageUrl") || Object.hasOwn(normalizedPayload, "galleryImages")) {
      const imageUrl = normalizedPayload.imageUrl ?? null;
      let galleryImages = sanitizeGalleryImages(normalizedPayload.galleryImages);

      if (imageUrl) {
        galleryImages = [imageUrl, ...galleryImages.filter((item) => item !== imageUrl)].slice(0, 4);
      }

      if (!imageUrl && galleryImages.length > 0) {
        normalizedPayload.imageUrl = galleryImages[0];
      }

      if (!normalizedPayload.imageUrl) {
        normalizedPayload.galleryImages = [];
      } else {
        normalizedPayload.galleryImages = galleryImages;
      }
    }

    return normalizedPayload;
  }

  async listPublicProducts() {
    try {
      return await this.portfolioProductRepository.findPublicProducts();
    } catch {
      throw new HttpError(503, "database unavailable");
    }
  }

  async listAdminProducts() {
    try {
      return await this.portfolioProductRepository.findAdminProducts();
    } catch {
      throw new HttpError(503, "database unavailable");
    }
  }

  async createProduct(payload) {
    try {
      return await this.portfolioProductRepository.createProduct(this.normalizePayload(payload));
    } catch {
      throw new HttpError(503, "database unavailable");
    }
  }

  async updateProduct(id, payload) {
    try {
      const currentProduct = await this.portfolioProductRepository.findProductById(id);
      if (!currentProduct) {
        throw new HttpError(404, "produk tidak ditemukan.");
      }

      const updatedProduct = await this.portfolioProductRepository.updateProduct(
        id,
        this.normalizePayload(payload),
      );

      const currentImageSet = new Set(collectProductImageUrls(currentProduct));
      const updatedImageSet = new Set(collectProductImageUrls(updatedProduct));
      const removedImages = [...currentImageSet].filter((item) => !updatedImageSet.has(item));
      await removeLocalPortfolioImages(removedImages);

      return updatedProduct;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      if (isPrismaNotFoundError(error)) {
        throw new HttpError(404, "produk tidak ditemukan.");
      }

      throw new HttpError(503, "database unavailable");
    }
  }

  async deleteProduct(id) {
    try {
      const currentProduct = await this.portfolioProductRepository.findProductById(id);
      if (!currentProduct) {
        throw new HttpError(404, "produk tidak ditemukan.");
      }

      await this.portfolioProductRepository.deleteProduct(id);
      await removeLocalPortfolioImages(collectProductImageUrls(currentProduct));
      return { success: true };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      if (isPrismaNotFoundError(error)) {
        throw new HttpError(404, "produk tidak ditemukan.");
      }

      throw new HttpError(503, "database unavailable");
    }
  }
}

export { PortfolioProductService };
