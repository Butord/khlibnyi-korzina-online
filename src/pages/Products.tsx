
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { getProducts, getProductCategories } from '@/services/productService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getProductCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        
        // Initialize quantities
        const initialQuantities: Record<number, number> = {};
        productsData.forEach(product => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
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

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <MainLayout>
      <div className="space-y-6 py-4">
        <h1 className="text-3xl font-bold">Каталог продукції</h1>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="all">Всі</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <p className="text-lg">Завантаження продукції...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={product.imageUrl || '/placeholder.svg'} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm">
                        {product.category}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <p className="text-xl font-semibold">{product.price.toFixed(2)} грн</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9"
                          onClick={() => updateQuantity(product.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center">{quantities[product.id] || 1}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9"
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        До кошика
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg">Товари не знайдено</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Products;
