import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";

export function useProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => productService.getProduct(),
  });

  return { data, isLoading };
}

export function useProductBySlug(slug: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });

  return { data, isLoading };
}
