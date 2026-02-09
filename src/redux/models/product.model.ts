export interface IProduct {
  id: number;
  product_name: string;
  description: string;
  article: string;
  price: number;
  discount: number;
  slug: string;
  keywords: string;
  brand: Brand;
  model: Model;
  body: Body;
  parts: Parts;
  material: Material;
  country: Country;
  images: ProductImage[];
}

export interface Brand {
  id: number;
  brand_name: string;
}

export interface Model {
  id: number;
  model_name: string;
}

export interface Body {
  id: number;
  type_name: string;
}

export interface Parts {
  id: number;
  spare_name: string;
}

export interface Material {
  id: number;
  material_name: string;
}

export interface Country {
  id: number;
  country_name: string;
}

export interface ProductImage {
  id: number;
  image: string;
}

export interface IProductById {
  id: number;
  product_name: string;
  description: string;
  article: string;
  price: number;
  discount: number;
  slug: string;
  keywords: string;
  brand: Brand;
  model: Model;
  body: Body;
  parts: Parts;
  material: Material;
  country: Country;
  images: ProductImage[];
}

export interface Brand {
  id: number;
  brand_name: string;
}

export interface Model {
  id: number;
  model_name: string;
}

export interface Body {
  id: number;
  type_name: string;
}

export interface Parts {
  id: number;
  spare_name: string;
}

export interface Material {
  id: number;
  material_name: string;
}

export interface Country {
  id: number;
  country_name: string;
}

export interface ProductImage {
  id: number;
  image: string;
}
