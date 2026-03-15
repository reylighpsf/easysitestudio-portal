import { useQuery } from "@tanstack/react-query";
import {
  fetchApiHealth,
  fetchPricePlans,
  fetchPortfolioProducts,
} from "@/lib/api";

export function useSiteData() {
  const apiHealthQuery = useQuery({
    queryKey: ["api-health"],
    queryFn: fetchApiHealth,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
  });

  const portfolioProductsQuery = useQuery({
    queryKey: ["portfolio-products"],
    queryFn: fetchPortfolioProducts,
    staleTime: 1000 * 60 * 5,
  });

  const pricePlansQuery = useQuery({
    queryKey: ["price-plans"],
    queryFn: fetchPricePlans,
    staleTime: 1000 * 60 * 5,
  });

  return {
    apiHealth: apiHealthQuery.data,
    portfolioProducts: portfolioProductsQuery.data ?? [],
    pricePlans: pricePlansQuery.data ?? [],
  };
}
