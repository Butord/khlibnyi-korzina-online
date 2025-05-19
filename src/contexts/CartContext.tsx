
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('bakeryCart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Update localStorage and totals when cart changes
  useEffect(() => {
    localStorage.setItem('bakeryCart', JSON.stringify(items));
    
    // Calculate totals
    const newTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const newItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    setTotal(newTotal);
    setItemCount(newItemCount);
  }, [items]);

  const addToCart = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if product already in cart
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast({
          title: "Товар оновлено",
          description: `${product.name} (${updatedItems[existingItemIndex].quantity} шт.)`,
        });
        return updatedItems;
      } else {
        // Add new item to cart
        toast({
          title: "Товар додано",
          description: `${product.name} (${quantity} шт.)`,
        });
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    toast({
      title: "Товар видалено",
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) => 
      prevItems.map((item) => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Кошик очищено",
    });
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
