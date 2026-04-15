import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { Product } from '../redux/slices/productSlice';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  getProducts: async (): Promise<Product[]> => {
    await delay(1000);
    return productsData as Product[];
  },
  getCategories: async () => {
    await delay(800);
    return categoriesData;
  },
  getProductById: async (id: number): Promise<Product | undefined> => {
    await delay(500);
    return (productsData as Product[]).find(p => p.id === id);
  },
  login: async (email: string, password: string) => {
    await delay(1500);
    if (email && password) {
      return {
        user: { id: '1', email, name: email.split('@')[0] },
        token: 'dummy-jwt-token',
      };
    }
    throw new Error('Invalid credentials');
  },
  processPayment: async (details: any) => {
    await delay(2000);
    return { success: true, orderId: Math.random().toString(36).substr(2, 9).toUpperCase() };
  }
};
