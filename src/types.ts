export type AgeCategory = 'todos' | 'recien_nacido' | 'bebe' | 'infantil' | 'accesorios';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  collection: string;
  collectionLabel: string;
  ageCategory: AgeCategory;
  ageLabel: string;
  priceUsd: number;
  sku: string;
  materials: string;
  colors: ProductColor[];
  sizes: string[];
  description: string;
  highlight: string;
  careInstructions: string[];
  inShowroom: boolean;
  featured: boolean;
  silhouetteType: 'romper' | 'dress' | 'set' | 'sweater' | 'shoes' | 'onesie' | 'pants' | 'overalls';
  accentColor: string;
}

export interface SizeChartRow {
  size: string;
  ageMonths: string;
  heightCm: string;
  weightKg: string;
  chestCm: string;
}

export interface ContactInquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  subject: string;
  message: string;
  interestedProduct?: string;
  interestedSize?: string;
  channel: 'formulario' | 'whatsapp_simulado';
  status: 'nueva' | 'atendida';
}

export interface CookiePreferences {
  accepted: boolean;
  analytics: boolean;
  preferences: boolean;
  updatedAt: string;
}

export interface CartInquiryItem {
  productId: string;
  name: string;
  priceUsd: number;
  size: string;
  colorName: string;
  quantity: number;
  sku: string;
}
