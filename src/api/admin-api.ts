import { buildApiUrl, resolveAssetUrl, type PortfolioProduct } from "@/lib/api";

export type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type ContactSubmissionResponse = {
  items: ContactSubmission[];
};

type PortfolioProductResponse = {
  items: PortfolioProduct[];
};

export type AdminPricePlan = {
  id: number;
  name: string;
  price: number;
  features: string;
  isHighlighted: boolean;
  sortOrder: number;
  isActive: boolean;
};

type AdminPricePlanResponse = {
  items: AdminPricePlan[];
};

export type PortfolioProductPayload = {
  title: string;
  category: string;
  price: number;
  gradientFrom?: string;
  gradientTo?: string;
  imageUrl?: string;
  galleryImages?: string[];
  projectUrl?: string;
  sortOrder: number;
  isActive: boolean;
  removeImage?: boolean;
};

export type PricePlanPayload = {
  name: string;
  price: number;
  features: string;
  isHighlighted: boolean;
  sortOrder: number;
  isActive: boolean;
};

export type AdminUser = {
  id: number;
  loginId: string;
  name: string;
  role: string;
};

type AdminLoginResponse = {
  token: string;
  admin: AdminUser;
};

export class AdminApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

const DEFAULT_GRADIENT_FROM = "#1d4ed8";
const DEFAULT_GRADIENT_TO = "#06b6d4";

function createAdminHeaders(
  authToken: string,
  extraHeaders?: HeadersInit,
  includeContentType = true,
) {
  const baseHeaders: Record<string, string> = {
    Authorization: `Bearer ${authToken}`,
  };

  if (includeContentType) {
    baseHeaders["Content-Type"] = "application/json";
  }

  return {
    ...baseHeaders,
    ...extraHeaders,
  };
}

async function requestAdminJson<T>(
  url: string,
  authToken: string,
  options?: RequestInit,
): Promise<T> {
  if (!authToken.trim()) {
    throw new AdminApiError(401, "Admin token is required");
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: createAdminHeaders(authToken, options?.headers),
    });
  } catch {
    throw new AdminApiError(503, "Tidak dapat terhubung ke server API admin.");
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const responseBody = await response.json();
      if (typeof responseBody?.error === "string" && responseBody.error) {
        message = responseBody.error;
      }
    } catch {
      // ignore invalid JSON body
    }

    throw new AdminApiError(response.status, message);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new AdminApiError(502, "Respons API admin tidak valid.");
  }
}

async function requestAdminFormDataJson<T>(
  url: string,
  authToken: string,
  formData: FormData,
  method: "POST" | "PUT",
): Promise<T> {
  if (!authToken.trim()) {
    throw new AdminApiError(401, "Admin token is required");
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers: createAdminHeaders(authToken, undefined, false),
      body: formData,
    });
  } catch {
    throw new AdminApiError(503, "Tidak dapat terhubung ke server API admin.");
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const responseBody = await response.json();
      if (typeof responseBody?.error === "string" && responseBody.error) {
        message = responseBody.error;
      }
    } catch {
      // ignore invalid JSON body
    }

    throw new AdminApiError(response.status, message);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new AdminApiError(502, "Respons API admin tidak valid.");
  }
}

function appendPortfolioPayload(formData: FormData, payload: Partial<PortfolioProductPayload>) {
  if (typeof payload.title === "string") {
    formData.append("title", payload.title);
  }
  if (typeof payload.category === "string") {
    formData.append("category", payload.category);
  }
  if (typeof payload.gradientFrom === "string") {
    formData.append("gradientFrom", payload.gradientFrom);
  }
  if (typeof payload.gradientTo === "string") {
    formData.append("gradientTo", payload.gradientTo);
  }
  if (typeof payload.imageUrl === "string") {
    formData.append("imageUrl", payload.imageUrl);
  }
  if (Array.isArray(payload.galleryImages)) {
    payload.galleryImages.forEach((item) => {
      if (typeof item === "string") {
        formData.append("galleryImages", item);
      }
    });
  }
  if (typeof payload.projectUrl === "string") {
    formData.append("projectUrl", payload.projectUrl);
  }
  if (typeof payload.price === "number" && Number.isFinite(payload.price)) {
    formData.append("price", String(payload.price));
  }
  if (typeof payload.sortOrder === "number" && Number.isFinite(payload.sortOrder)) {
    formData.append("sortOrder", String(payload.sortOrder));
  }
  if (typeof payload.isActive === "boolean") {
    formData.append("isActive", String(payload.isActive));
  }
  if (typeof payload.removeImage === "boolean") {
    formData.append("removeImage", String(payload.removeImage));
  }
}

function normalizeCreatePortfolioPayload(
  payload: PortfolioProductPayload,
): PortfolioProductPayload {
  const normalizedSortOrder =
    typeof payload.sortOrder === "number" ? payload.sortOrder : Number.NaN;
  if (!Number.isFinite(normalizedSortOrder)) {
    throw new AdminApiError(400, "sortOrder tidak valid.");
  }
  const normalizedPrice = typeof payload.price === "number" ? payload.price : Number.NaN;
  if (!Number.isFinite(normalizedPrice) || normalizedPrice < 0) {
    throw new AdminApiError(400, "price tidak valid.");
  }

  return {
    ...payload,
    title: typeof payload.title === "string" ? payload.title.trim() : "",
    category: typeof payload.category === "string" ? payload.category.trim() : "",
    gradientFrom:
      typeof payload.gradientFrom === "string" && payload.gradientFrom.trim()
        ? payload.gradientFrom.trim()
        : DEFAULT_GRADIENT_FROM,
    gradientTo:
      typeof payload.gradientTo === "string" && payload.gradientTo.trim()
        ? payload.gradientTo.trim()
        : DEFAULT_GRADIENT_TO,
    price: Math.round(normalizedPrice),
    sortOrder: normalizedSortOrder,
  };
}

function normalizeUpdatePortfolioPayload(
  payload: Partial<PortfolioProductPayload>,
): Partial<PortfolioProductPayload> {
  const normalizedPayload: Partial<PortfolioProductPayload> = { ...payload };

  if (typeof normalizedPayload.sortOrder === "number" && !Number.isFinite(normalizedPayload.sortOrder)) {
    throw new AdminApiError(400, "sortOrder tidak valid.");
  }
  if (typeof normalizedPayload.price === "number") {
    if (!Number.isFinite(normalizedPayload.price) || normalizedPayload.price < 0) {
      throw new AdminApiError(400, "price tidak valid.");
    }
    normalizedPayload.price = Math.round(normalizedPayload.price);
  }

  if (typeof normalizedPayload.title === "string") {
    normalizedPayload.title = normalizedPayload.title.trim();
  }
  if (typeof normalizedPayload.category === "string") {
    normalizedPayload.category = normalizedPayload.category.trim();
  }
  if (typeof normalizedPayload.gradientFrom === "string" && !normalizedPayload.gradientFrom.trim()) {
    normalizedPayload.gradientFrom = DEFAULT_GRADIENT_FROM;
  }
  if (typeof normalizedPayload.gradientTo === "string" && !normalizedPayload.gradientTo.trim()) {
    normalizedPayload.gradientTo = DEFAULT_GRADIENT_TO;
  }

  return normalizedPayload;
}

function normalizeCreatePricePlanPayload(payload: PricePlanPayload): PricePlanPayload {
  const normalizedSortOrder =
    typeof payload.sortOrder === "number" ? payload.sortOrder : Number.NaN;
  if (!Number.isFinite(normalizedSortOrder)) {
    throw new AdminApiError(400, "sortOrder tidak valid.");
  }

  const normalizedPrice = typeof payload.price === "number" ? payload.price : Number.NaN;
  if (!Number.isFinite(normalizedPrice) || normalizedPrice < 0) {
    throw new AdminApiError(400, "price tidak valid.");
  }

  const normalizedName = typeof payload.name === "string" ? payload.name.trim() : "";
  const normalizedFeatures = typeof payload.features === "string" ? payload.features.trim() : "";
  if (!normalizedName) {
    throw new AdminApiError(400, "name wajib diisi.");
  }
  if (!normalizedFeatures) {
    throw new AdminApiError(400, "features wajib diisi.");
  }

  return {
    ...payload,
    name: normalizedName,
    features: normalizedFeatures,
    price: Math.round(normalizedPrice),
    sortOrder: normalizedSortOrder,
  };
}

function normalizeUpdatePricePlanPayload(
  payload: Partial<PricePlanPayload>,
): Partial<PricePlanPayload> {
  const normalizedPayload: Partial<PricePlanPayload> = { ...payload };

  if (typeof normalizedPayload.sortOrder === "number" && !Number.isFinite(normalizedPayload.sortOrder)) {
    throw new AdminApiError(400, "sortOrder tidak valid.");
  }

  if (typeof normalizedPayload.price === "number") {
    if (!Number.isFinite(normalizedPayload.price) || normalizedPayload.price < 0) {
      throw new AdminApiError(400, "price tidak valid.");
    }
    normalizedPayload.price = Math.round(normalizedPayload.price);
  }

  if (typeof normalizedPayload.name === "string") {
    normalizedPayload.name = normalizedPayload.name.trim();
  }
  if (typeof normalizedPayload.features === "string") {
    normalizedPayload.features = normalizedPayload.features.trim();
  }

  return normalizedPayload;
}

export async function loginAdmin(payload: { id: string; password: string }) {
  let response: Response;
  try {
    response = await fetch(buildApiUrl("/api/admin/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new AdminApiError(503, "Tidak dapat terhubung ke server API admin.");
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const responseBody = await response.json();
      if (typeof responseBody?.error === "string" && responseBody.error) {
        message = responseBody.error;
      }
    } catch {
      // ignore invalid JSON body
    }

    throw new AdminApiError(response.status, message);
  }

  try {
    return (await response.json()) as AdminLoginResponse;
  } catch {
    throw new AdminApiError(502, "Respons login admin tidak valid.");
  }
}

export async function fetchAdminContacts(authToken: string, limit = 100) {
  const response = await requestAdminJson<ContactSubmissionResponse>(
    buildApiUrl(`/api/admin/contacts?limit=${limit}`),
    authToken,
  );
  return response.items;
}

export async function fetchAdminPortfolioProducts(authToken: string) {
  const response = await requestAdminJson<PortfolioProductResponse>(
    buildApiUrl("/api/admin/portfolio-products"),
    authToken,
  );
  return response.items.map((item) => {
    const normalizedImageUrl = resolveAssetUrl(item.imageUrl);
    const normalizedGalleryImages = Array.isArray(item.galleryImages)
      ? item.galleryImages
          .map((imagePath) => resolveAssetUrl(typeof imagePath === "string" ? imagePath : null))
          .filter((imagePath): imagePath is string => Boolean(imagePath))
      : [];
    const mergedGalleryImages = [
      ...(normalizedImageUrl ? [normalizedImageUrl] : []),
      ...normalizedGalleryImages,
    ]
      .filter((imagePath, index, array) => array.indexOf(imagePath) === index)
      .slice(0, 4);

    return {
      ...item,
      imageUrl: normalizedImageUrl ?? mergedGalleryImages[0] ?? null,
      galleryImages: mergedGalleryImages,
    };
  });
}

export async function fetchAdminPricePlans(authToken: string) {
  const response = await requestAdminJson<AdminPricePlanResponse>(
    buildApiUrl("/api/admin/price-plans"),
    authToken,
  );

  return response.items
    .map((item) => ({
      ...item,
      name: typeof item.name === "string" ? item.name.trim() : "",
      features: typeof item.features === "string" ? item.features.trim() : "",
      price: typeof item.price === "number" && Number.isFinite(item.price) ? item.price : 0,
      sortOrder: typeof item.sortOrder === "number" && Number.isFinite(item.sortOrder) ? item.sortOrder : 0,
      isActive: typeof item.isActive === "boolean" ? item.isActive : true,
      isHighlighted: typeof item.isHighlighted === "boolean" ? item.isHighlighted : false,
    }))
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

export function createAdminPortfolioProduct(
  authToken: string,
  payload: PortfolioProductPayload,
  imageFiles?: File[] | null,
) {
  const formData = new FormData();
  appendPortfolioPayload(formData, normalizeCreatePortfolioPayload(payload));
  if (Array.isArray(imageFiles)) {
    imageFiles.slice(0, 4).forEach((file) => {
      formData.append("imageFiles", file);
    });
  }

  return requestAdminFormDataJson<PortfolioProduct>(buildApiUrl("/api/admin/portfolio-products"), authToken, formData, "POST")
    .then((item) => {
      const normalizedImageUrl = resolveAssetUrl(item.imageUrl);
      const normalizedGalleryImages = Array.isArray(item.galleryImages)
        ? item.galleryImages
            .map((imagePath) => resolveAssetUrl(typeof imagePath === "string" ? imagePath : null))
            .filter((imagePath): imagePath is string => Boolean(imagePath))
        : [];
      const mergedGalleryImages = [
        ...(normalizedImageUrl ? [normalizedImageUrl] : []),
        ...normalizedGalleryImages,
      ]
        .filter((imagePath, index, array) => array.indexOf(imagePath) === index)
        .slice(0, 4);

      return {
        ...item,
        imageUrl: normalizedImageUrl ?? mergedGalleryImages[0] ?? null,
        galleryImages: mergedGalleryImages,
      };
    });
}

export function updateAdminPortfolioProduct(
  authToken: string,
  productId: number,
  payload: Partial<PortfolioProductPayload>,
  imageFiles?: File[] | null,
) {
  const formData = new FormData();
  appendPortfolioPayload(formData, normalizeUpdatePortfolioPayload(payload));
  if (Array.isArray(imageFiles)) {
    imageFiles.slice(0, 4).forEach((file) => {
      formData.append("imageFiles", file);
    });
  }

  return requestAdminFormDataJson<PortfolioProduct>(buildApiUrl(`/api/admin/portfolio-products/${productId}`), authToken, formData, "PUT")
    .then((item) => {
      const normalizedImageUrl = resolveAssetUrl(item.imageUrl);
      const normalizedGalleryImages = Array.isArray(item.galleryImages)
        ? item.galleryImages
            .map((imagePath) => resolveAssetUrl(typeof imagePath === "string" ? imagePath : null))
            .filter((imagePath): imagePath is string => Boolean(imagePath))
        : [];
      const mergedGalleryImages = [
        ...(normalizedImageUrl ? [normalizedImageUrl] : []),
        ...normalizedGalleryImages,
      ]
        .filter((imagePath, index, array) => array.indexOf(imagePath) === index)
        .slice(0, 4);

      return {
        ...item,
        imageUrl: normalizedImageUrl ?? mergedGalleryImages[0] ?? null,
        galleryImages: mergedGalleryImages,
      };
    });
}

export function deleteAdminPortfolioProduct(authToken: string, productId: number) {
  return requestAdminJson<{ success: boolean }>(
    buildApiUrl(`/api/admin/portfolio-products/${productId}`),
    authToken,
    {
      method: "DELETE",
    },
  );
}

export function createAdminPricePlan(authToken: string, payload: PricePlanPayload) {
  return requestAdminJson<AdminPricePlan>(buildApiUrl("/api/admin/price-plans"), authToken, {
    method: "POST",
    body: JSON.stringify(normalizeCreatePricePlanPayload(payload)),
  });
}

export function updateAdminPricePlan(
  authToken: string,
  pricePlanId: number,
  payload: Partial<PricePlanPayload>,
) {
  return requestAdminJson<AdminPricePlan>(
    buildApiUrl(`/api/admin/price-plans/${pricePlanId}`),
    authToken,
    {
      method: "PUT",
      body: JSON.stringify(normalizeUpdatePricePlanPayload(payload)),
    },
  );
}

export function deleteAdminPricePlan(authToken: string, pricePlanId: number) {
  return requestAdminJson<{ success: boolean }>(
    buildApiUrl(`/api/admin/price-plans/${pricePlanId}`),
    authToken,
    {
      method: "DELETE",
    },
  );
}
