export interface IOrderItem {
  product: IProduct;
  quantity: number;
  price: number;
  total_price: number;
}

export interface IOrder {
  id: number;
  created_at: string;
  consideration: boolean;
  items: IOrderItem[];
}

export interface IProduct {
  id: number;
  product_name: string;
  description: string;
  article: string;
  price: number;
  discount: number;
  slug: string;
  keywords: string;
  brand: { id: number; brand_name: string };
  model: { id: number; model_name: string };
  body: { id: number; type_name: string };
  parts: { id: number; spare_name: string };
  material: { id: number; material_name: string };
  country: { id: number; country_name: string };
  images: { image: string }[];
}
