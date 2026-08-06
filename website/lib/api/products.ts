import productsData from '@/app/products/data.json';
import { Product } from '@/utils/interfaces';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ProductsResponse {
  items: Product[];
  paginate: {
    page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!API_BASE) {
    // If no API URL configured, fallback to local JSON
    return productsData as Product[];
  }
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data: ProductsResponse = await res.json();
    return data.items;
  } catch {
    return productsData as Product[];
  }
}

export async function getProduct(id: string): Promise<Product | undefined> {
  if (!API_BASE) {
    return productsData.find(p => p.id === id) as Product | undefined;
  }
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return await res.json();
  } catch {
    return productsData.find(p => p.id === id) as Product | undefined;
  }
}

// For static generation
export { productsData };
