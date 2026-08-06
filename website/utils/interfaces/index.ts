import { CSSProperties } from "react";

export interface IconProps {
  width?: number,
  height?: number,
  style?: CSSProperties,
  className?: string,
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description: string;
  color: string;
  type: string;
  size: string[];
  popularity: number;
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface ProductReview {
  authorId: string;
  headline: string;
  text: string;
  rating: number;
}

// Update Product interface
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description: string;
  color: string;
  type: string;
  size: string[];
  popularity: number;
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
}
