import api from './api';
import { Product, ProductCreate } from '../types/product';
import { PaginatedResponse } from '../types/api';

export async function getProducts(skip = 0, limit = 10) {
  const params = new URLSearchParams({
    skip: skip.toString(),
    limit: limit.toString(),
  });
  
  const response = await api.get<PaginatedResponse<Product>>(
    `/products/?${params}`
  );
  return response.data;
}

export async function createProduct(product: ProductCreate) {
  const response = await api.post<Product>('/products/', product);
  return response.data;
}

export async function getProduct(productId: number) {
  const response = await api.get<Product>(`/products/${productId}`);
  return response.data;
}

export async function updateProduct(productId: number, product: ProductCreate) {
  const response = await api.put<Product>(
    `/products/${productId}`,
    product
  );
  return response.data;
}

export async function deleteProduct(productId: number) {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
}

export async function updateStock(productId: number, stockQuantity: number) {
  const response = await api.patch<Product>(
    `/products/${productId}/stock`,
    { stock_quantity: stockQuantity }
  );
  return response.data;
}