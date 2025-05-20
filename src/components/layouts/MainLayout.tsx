
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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu */}
            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 mt-8">
                    <Link to="/" className="px-4 py-2 hover:bg-secondary rounded-md">
                      Головна
                    </Link>
                    <Link to="/products" className="px-4 py-2 hover:bg-secondary rounded-md">
                      Продукти
                    </Link>
                    {user ? (
                      <>
                        <div className="mb-4 text-sm">
                          Користувач: <span className="font-medium">{user.firstName} {user.lastName}</span>
                        </div>
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

            {/* Logo */}
            <div>
              <Link to="/" className="font-bold text-xl">Хлібна</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/" className="hover:text-primary transition-colors">
                Головна
              </Link>
              <Link to="/products" className="hover:text-primary transition-colors">
                Продукти
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                Контакти
              </Link>
              
              {/* User Menu and Cart */}
              {user ? (
                <div className="flex items-center gap-3 ml-4">
                  <Link to="/cart">
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white px-1.5 py-0.5 rounded-full text-xs">
                          {itemCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={logout}
                  >
                    Вихід
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 ml-4">
                  <Link to="/login">
                    <Button variant="outline" size="sm">Вхід</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Реєстрація</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary py-6 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-base font-bold mb-2">Контакти</h3>
              <p className="text-sm">Телефон: +380 12 345 6789</p>
              <p className="text-sm">Email: info@bakery.ua</p>
            </div>
            <div>
              <h3 className="text-base font-bold mb-2">Адреса</h3>
              <p className="text-sm">вул. Хлібна, 123, м. Київ, 01001, Україна</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">© 2025 Хлібобулочні вироби</p>
              <p className="text-sm">Усі права захищено</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
