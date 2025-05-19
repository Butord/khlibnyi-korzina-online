
import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Trash, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { createOrder } from '@/services/orderService';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Помилка",
        description: "Будь ласка, увійдіть для оформлення замовлення",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Кошик порожній",
        description: "Додайте товари до кошика перед оформленням замовлення",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await createOrder(user.id, items, total);
      clearCart();
      
      toast({
        title: "Замовлення успішно оформлено!",
        description: "Ми зв'яжемося з вами найближчим часом"
      });
      
      navigate('/products');
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Виникла помилка під час оформлення замовлення",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 py-4">
        <h1 className="text-3xl font-bold">Кошик</h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Товари в кошику ({items.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id}>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 overflow-hidden rounded-md">
                          <img
                            src={item.product.imageUrl || '/placeholder.svg'}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.product.category}
                          </p>
                          <p className="font-medium mt-1">
                            {item.product.price.toFixed(2)} грн
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearCart}
                  >
                    Очистити кошик
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Разом до сплати</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Товари на суму:</span>
                    <span className="font-medium">{total.toFixed(2)} грн</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span className="font-medium">0.00 грн</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Разом:</span>
                    <span>{total.toFixed(2)} грн</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting || items.length === 0}
                  >
                    {isSubmitting ? (
                      "Оформлення..."
                    ) : (
                      <>
                        Оформити замовлення
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Ваш кошик порожній</h3>
                <p className="text-muted-foreground">
                  Перегляньте наш каталог і додайте товари до кошика
                </p>
              </div>
              <Button onClick={() => navigate('/products')}>
                Перейти до каталогу
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
