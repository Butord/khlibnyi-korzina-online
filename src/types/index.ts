
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  isApproved: boolean;
  isAdmin: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}
