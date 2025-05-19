
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Спрощений заголовок */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Замовлення продукції</h1>
          </Link>
          
          {/* Мобільне меню */}
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  {user ? (
                    <>
                      <div className="mb-4 text-sm">
                        Користувач: <span className="font-medium">{user.firstName} {user.lastName}</span>
                      </div>
                      <Link to="/products" className="px-4 py-2 hover:bg-secondary rounded-md">
                        Каталог продукції
                      </Link>
                      <Link to="/cart" className="px-4 py-2 hover:bg-secondary rounded-md flex items-center justify-between">
                        <span>Кошик</span>
                        {itemCount > 0 && (
                          <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs">
                            {itemCount}
                          </span>
                        )}
                      </Link>
                      {user.isAdmin && (
                        <Link to="/admin" className="px-4 py-2 hover:bg-secondary rounded-md">
                          Адмін панель
                        </Link>
                      )}
                      <Button 
                        variant="outline" 
                        onClick={logout}
                        className="mt-2"
                      >
                        Вихід
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="px-4 py-2 hover:bg-secondary rounded-md">
                        Вхід
                      </Link>
                      <Link to="/register" className="px-4 py-2 hover:bg-secondary rounded-md">
                        Реєстрація
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Десктопне меню */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <Link to="/products">
                  <Button variant="ghost" size="sm">Каталог</Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white px-1.5 py-0.5 rounded-full text-xs">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
                {user.isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">Адмін</Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                >
                  Вихід
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Вхід</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Реєстрація</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Основний контент */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Спрощений футер */}
      <footer className="bg-gray-100 py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 Замовлення продукції</p>
        </div>
      </footer>
    </div>
  );
};
