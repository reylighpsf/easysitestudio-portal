export type SiteConfig = {
  brandPrefix: string;
  brandAccent: string;
  contactCtaLabel: string;
  contactCtaLink: string;
  heroHeadlineMain: string;
  heroHeadlineAccent: string;
  heroHeadlineTail: string;
  heroDescription: string;
  footerCopyright: string;
};

export type PortfolioProduct = {
  id: number;
  title: string;
  category: string;
  price: number;
  gradientFrom: string;
  gradientTo: string;
  imageUrl: string | null;
  galleryImages: string[];
  projectUrl: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type PricePlan = {
  id: number;
  name: string;
  price: number;
  features: string[];
  isHighlighted: boolean;
  sortOrder: number;
  isActive: boolean;
};

export type ApiHealth = {
  status: "ok" | "offline";
  timestamp: string;
  service: string;
};

type PortfolioProductResponse = {
  items: PortfolioProduct[];
};

type PricePlanResponse = {
  items: Array<{
    id: number;
    name: string;
    price: number;
    features: string;
    isHighlighted: boolean;
    sortOrder: number;
    isActive: boolean;
  }>;
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandPrefix: "web",
  brandAccent: "craft",
  contactCtaLabel: "Hubungi Kami",
  contactCtaLink: "https://wa.me/6281234567890",
  heroHeadlineMain: "Desain Modern,",
  heroHeadlineAccent: "Performa",
  heroHeadlineTail: "Luar Biasa",
  heroDescription:
    "Dengan sentuhan profesional dan teknologi terkini, kami hadirkan website yang memukau, responsif, dan siap mengembangkan bisnis Anda.",
  footerCopyright: "(c) 2026 webcraft. All rights reserved.",
};


const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").trim().replace(/\/$/, "");

export function buildApiUrl(path: string): string {
  if (!API_BASE_URL) {
    return path;
  }

  if (path.startsWith("/")) {
    return `${API_BASE_URL}${path}`;
  }

  return `${API_BASE_URL}/${path}`;
}

export function resolveAssetUrl(pathValue: string | null): string | null {
  if (!pathValue) {
    return null;
  }

  if (/^https?:\/\//i.test(pathValue) || pathValue.startsWith("data:")) {
    return pathValue;
  }

  return buildApiUrl(pathValue);
}

async function requestJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchSiteConfig(): Promise<SiteConfig> {
  try {
    return await requestJson<SiteConfig>(buildApiUrl("/api/site-config"));
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

export async function fetchPortfolioProducts(): Promise<PortfolioProduct[]> {
  try {
    const response = await requestJson<PortfolioProductResponse>(
      buildApiUrl("/api/portfolio-products"),
    );

    if (!Array.isArray(response.items)) {
      return [];
    }

    return response.items
      .map((item) => {
        const normalizedTitle =
          typeof item.title === "string" && item.title.trim().length > 0
            ? item.title.trim()
            : "Produk Website";
        const normalizedCategory =
          typeof item.category === "string" && item.category.trim().length > 0
            ? item.category.trim()
            : "Website";
        const normalizedPrice =
          typeof item.price === "number" && Number.isFinite(item.price) && item.price >= 0
            ? item.price
            : 0;
        const normalizedSortOrder =
          typeof item.sortOrder === "number" && Number.isFinite(item.sortOrder) ? item.sortOrder : 0;
        const normalizedIsActive = typeof item.isActive === "boolean" ? item.isActive : true;
        const normalizedProjectUrl =
          typeof item.projectUrl === "string" && /^https?:\/\/.+/i.test(item.projectUrl.trim())
            ? item.projectUrl.trim()
            : null;
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
          title: normalizedTitle,
          category: normalizedCategory,
          price: normalizedPrice,
          gradientFrom:
            typeof item.gradientFrom === "string" && item.gradientFrom.trim().length > 0
              ? item.gradientFrom.trim()
              : "#0f172a",
          gradientTo:
            typeof item.gradientTo === "string" && item.gradientTo.trim().length > 0
              ? item.gradientTo.trim()
              : "#334155",
          imageUrl: normalizedImageUrl ?? mergedGalleryImages[0] ?? null,
          galleryImages: mergedGalleryImages,
          projectUrl: normalizedProjectUrl,
          sortOrder: normalizedSortOrder,
          isActive: normalizedIsActive,
        };
      })
      .sort((left, right) => left.sortOrder - right.sortOrder);
  } catch {
    return [];
  }
}

export async function fetchPricePlans(): Promise<PricePlan[]> {
  try {
    const response = await requestJson<PricePlanResponse>(buildApiUrl("/api/price-plans"));
    if (!Array.isArray(response.items)) {
      return [];
    }

    return response.items
      .map((item) => {
        const normalizedName =
          typeof item.name === "string" && item.name.trim().length > 0 ? item.name.trim() : "Paket";
        const normalizedPrice =
          typeof item.price === "number" && Number.isFinite(item.price) && item.price >= 0
            ? item.price
            : 0;
        const normalizedSortOrder =
          typeof item.sortOrder === "number" && Number.isFinite(item.sortOrder) ? item.sortOrder : 0;
        const normalizedIsActive = typeof item.isActive === "boolean" ? item.isActive : true;
        const normalizedHighlighted =
          typeof item.isHighlighted === "boolean" ? item.isHighlighted : false;
        const normalizedFeatures =
          typeof item.features === "string"
            ? item.features
                .split(/\r?\n/)
                .map((part) => part.trim())
                .filter(Boolean)
            : [];

        return {
          id: item.id,
          name: normalizedName,
          price: normalizedPrice,
          features: normalizedFeatures,
          isHighlighted: normalizedHighlighted,
          sortOrder: normalizedSortOrder,
          isActive: normalizedIsActive,
        };
      })
      .filter((item) => item.isActive)
      .sort((left, right) => left.sortOrder - right.sortOrder);
  } catch {
    return [];
  }
}

export async function fetchApiHealth(): Promise<ApiHealth> {
  try {
    return await requestJson<ApiHealth>(buildApiUrl("/api/health"));
  } catch {
    return {
      status: "offline",
      service: "easysitestudio-portal-api",
      timestamp: new Date().toISOString(),
    };
  }
}
