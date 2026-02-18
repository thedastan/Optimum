import { PUBLIC_API } from "@/api/interceptors";
import { IProduct } from "../models/product.model";

class ProductService {
  private BASE_URL = "/products/";

  async getProduct() {
    const response = await PUBLIC_API.get<IProduct[]>(
      `${this.BASE_URL}product`,
    );
    return response.data;
  }

  async getProductBySlug(slug: string) {
    const response = await PUBLIC_API.get<IProduct>(
      `${this.BASE_URL}/product/${slug}`,
    );
    return response.data;
  }
}

export const productService = new ProductService();
