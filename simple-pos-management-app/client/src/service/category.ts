 import api from './api';
import { Category, CategoryCreate, CategoryWithProducts } from '../types/category';

export async function getCategories() {
  const response = await api.get<Category[]>('/categories/');
  return response.data;
}

export async function createCategory(category: CategoryCreate) {
  const response = await api.post<Category>('/categories/', category);
  return response.data;
}

export async function getCategory(categoryId: number) {
  const response = await api.get<CategoryWithProducts>(`/categories/${categoryId}`);
  return response.data;
}

export async function updateCategory(categoryId: number, category: CategoryCreate) {
  const response = await api.put<Category>(
    `/categories/${categoryId}`,
    category
  );
  return response.data;
}

export async function deleteCategory(categoryId: number) {
  const response = await api.delete(`/categories/${categoryId}`);
  return response.data;
}