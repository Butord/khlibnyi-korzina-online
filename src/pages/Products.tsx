
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { getProducts } from '@/services/productService';
import { Plus, Minus } from 'lucide-react';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        
        // Initialize quantities
        const initialQuantities: Record<number, number> = {};
        productsData.forEach(product => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, quantities[product.id] || 1);
  };

  const updateQuantity = (productId: number, delta: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(1, (prev[productId] || 1) + delta);
      return { ...prev, [productId]: newQuantity };
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Каталог продукції</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>Завантаження...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {products.map(product => (
              <Card key={product.id} className="shadow-none border">
                <CardContent className="py-2 flex items-center justify-between">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{quantities[product.id] || 1}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      size="sm"
                    >
                      Додати
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>Товари не знайдено</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Products;
