import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { HttpError } from "../utils/http-error.js";

const portfolioUploadDir = path.resolve(process.cwd(), "public", "uploads", "portfolio");
fs.mkdirSync(portfolioUploadDir, { recursive: true });

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, portfolioUploadDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname || "").toLowerCase();
    const safeExtension = extension || ".jpg";
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExtension}`;
    callback(null, filename);
  },
});

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new HttpError(400, "format gambar tidak didukung."));
      return;
    }

    callback(null, true);
  },
});

const uploadPortfolioImage = (req, res, next) => {
  multerUpload.fields([
    { name: "imageFiles", maxCount: 4 },
    { name: "imageFile", maxCount: 1 },
  ])(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof HttpError) {
      next(error);
      return;
    }

    if (error?.code === "LIMIT_FILE_SIZE") {
      next(new HttpError(400, "ukuran gambar maksimal 5MB."));
      return;
    }
    if (error?.code === "LIMIT_UNEXPECTED_FILE") {
      next(new HttpError(400, "maksimal 4 gambar per produk."));
      return;
    }

    next(new HttpError(400, "upload gambar gagal."));
  });
};

const toStringArray = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const normalizedValue = value.trim();
    return normalizedValue ? [normalizedValue] : [];
  }

  return [];
};

const attachPortfolioImageField = (req, _res, next) => {
  if (!req.body) {
    req.body = {};
  }

  const uploadedFiles = [];
  if (Array.isArray(req.files?.imageFiles)) {
    uploadedFiles.push(...req.files.imageFiles);
  }
  if (Array.isArray(req.files?.imageFile)) {
    uploadedFiles.push(...req.files.imageFile);
  }

  const uploadedImageUrls = uploadedFiles
    .map((file) => file?.filename)
    .filter(Boolean)
    .slice(0, 4)
    .map((filename) => `/uploads/portfolio/${filename}`);

  const existingGalleryImages = toStringArray(req.body.galleryImages).slice(0, 4);
  const existingImageUrl =
    typeof req.body.imageUrl === "string" && req.body.imageUrl.trim().length > 0
      ? req.body.imageUrl.trim()
      : null;

  if (uploadedImageUrls.length > 0) {
    const mergedGalleryImages = [
      ...existingGalleryImages,
      ...(existingImageUrl ? [existingImageUrl] : []),
      ...uploadedImageUrls,
    ]
      .filter((item, index, array) => array.indexOf(item) === index)
      .slice(0, 4);

    req.body.galleryImages = mergedGalleryImages;
    req.body.imageUrl = existingImageUrl ?? mergedGalleryImages[0] ?? uploadedImageUrls[0];
  }

  if (req.body.removeImage === "true" || req.body.removeImage === true) {
    req.body.imageUrl = "";
    req.body.galleryImages = [];
  }

  next();
};

export { uploadPortfolioImage, attachPortfolioImageField };
