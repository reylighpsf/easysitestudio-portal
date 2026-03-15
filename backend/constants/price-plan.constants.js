export const defaultPricePlans = [
  {
    id: 1,
    name: "Starter",
    price: 950000,
    features: "1 halaman utama\nDesain responsif\nForm kontak\nIntegrasi WhatsApp",
    isHighlighted: false,
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    name: "Business",
    price: 1800000,
    features: "3-5 halaman\nCopywriting ringan\nSEO on-page dasar\nSupport maintenance 30 hari",
    isHighlighted: true,
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    name: "Professional",
    price: 3500000,
    features: "Landing + CMS\nIntegrasi analytics\nOptimasi performa\nPrioritas support",
    isHighlighted: false,
    sortOrder: 3,
    isActive: true,
  },
];

export const pricePlanSelect = {
  id: true,
  name: true,
  price: true,
  features: true,
  isHighlighted: true,
  sortOrder: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};
