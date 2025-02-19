import { Product } from './product';

export interface CategoryBase {
  name: string;
  status: boolean;
}

export interface Category extends CategoryBase {
  id: number;
  created_at: string;  
  updated_at: string;
}

export type CategoryCreate = CategoryBase;

export interface CategoryWithProducts extends Category {
  products: Product[];
}