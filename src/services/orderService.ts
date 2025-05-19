
import { Order, CartItem } from "../types";

// Mock order data (in a real app, this would come from an API)
const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    userId: 2,
    items: [
      {
        product: {
          id: 1,
          name: "Білий хліб",
          description: "Класичний білий хліб з пшеничного борошна.",
          price: 25.00,
          imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=300",
          category: "Хліб",
          available: true
        },
        quantity: 2
      },
      {
        product: {
          id: 4,
          name: "Круасан",
          description: "Легкий та маслянистий круасан з шарами тіста.",
          price: 22.00,
          imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=300",
          category: "Випічка",
          available: true
        },
        quantity: 3
      }
    ],
    totalAmount: 116.00,
    status: 'completed',
    createdAt: '2025-05-17T10:30:00'
  }
];

export const getOrders = async (): Promise<Order[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_ORDERS]);
    }, 500);
  });
};

export const getUserOrders = async (userId: number): Promise<Order[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = MOCK_ORDERS.filter((order) => order.userId === userId);
      resolve([...orders]);
    }, 500);
  });
};

export const getOrderById = async (id: number): Promise<Order | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = MOCK_ORDERS.find((order) => order.id === id) || null;
      resolve(order ? { ...order } : null);
    }, 300);
  });
};

export const createOrder = async (userId: number, items: CartItem[], totalAmount: number): Promise<Order> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.max(...MOCK_ORDERS.map((o) => o.id), 0) + 1,
        userId,
        items: [...items],
        totalAmount,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      MOCK_ORDERS.push(newOrder);
      resolve({ ...newOrder });
    }, 500);
  });
};

export const updateOrderStatus = async (id: number, status: 'pending' | 'confirmed' | 'completed' | 'cancelled'): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderIndex = MOCK_ORDERS.findIndex((order) => order.id === id);
      if (orderIndex === -1) {
        resolve(false);
        return;
      }
      
      MOCK_ORDERS[orderIndex].status = status;
      resolve(true);
    }, 500);
  });
};
