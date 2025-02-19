export interface PaginatedResponse<T> {
  items: T[];
  total_pages: number;
  total: number;
}