import { Category } from "./category";

export interface ProductBase {
  name: string;
  sku: string;
  price: number;
  stock_quantity: number;
  description?: string;
  category_id: number;
  status: boolean;
}

export interface Product extends ProductBase {
  id: number;
  created_at: string;
  updated_at: string;
  category: Category;
}

export type ProductCreate = ProductBase;

export interface ProductPaginationResponse {
  items: Product[];
  total_pages: number;
  total: number;
}
