
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-bakery-cream shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu */}
            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5 text-bakery-brown" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 mt-8">
                    <Link to="/" className="px-4 py-2 hover:bg-bakery-cream rounded-md text-bakery-brown">
                      Головна
                    </Link>
                    <Link to="/products" className="px-4 py-2 hover:bg-bakery-cream rounded-md text-bakery-brown">
                      Продукти
                    </Link>
                    {user ? (
                      <>
                        <div className="mb-4 text-sm">
                          Користувач: <span className="font-medium">{user.firstName} {user.lastName}</span>
                        </div>
                        <Link to="/cart" className="px-4 py-2 hover:bg-bakery-cream rounded-md flex items-center justify-between">
                          <span className="text-bakery-brown">Кошик</span>
                          {itemCount > 0 && (
                            <span className="bg-bakery-brown text-white px-2 py-0.5 rounded-full text-xs">
                              {itemCount}
                            </span>
                          )}
                        </Link>
                        {user.isAdmin && (
                          <Link to="/admin" className="px-4 py-2 hover:bg-bakery-cream rounded-md text-bakery-brown">
                            Адмін панель
                          </Link>
                        )}
                        <Button 
                          variant="outline" 
                          onClick={logout}
                          className="mt-2 border-bakery-brown text-bakery-brown"
                        >
                          Вихід
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="px-4 py-2 hover:bg-bakery-cream rounded-md text-bakery-brown">
                          Вхід
                        </Link>
                        <Link to="/register" className="px-4 py-2 hover:bg-bakery-cream rounded-md text-bakery-brown">
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
              <Link to="/" className="font-bold text-xl text-bakery-brown">Хлібна</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-bakery-brown transition-colors">
                Головна
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-bakery-brown transition-colors">
                Продукти
              </Link>
              <Link to="#" className="text-gray-700 hover:text-bakery-brown transition-colors">
                Контакти
              </Link>
              
              {/* User Menu and Cart */}
              {user ? (
                <div className="flex items-center gap-3 ml-4">
                  <Link to="/cart">
                    <Button variant="ghost" size="icon" className="relative text-bakery-brown">
                      <ShoppingCart className="h-5 w-5" />
                      {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-bakery-brown text-white px-1.5 py-0.5 rounded-full text-xs">
                          {itemCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={logout}
                    className="border-bakery-brown text-bakery-brown hover:bg-bakery-cream"
                  >
                    Вихід
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 ml-4">
                  <Link to="/login">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-bakery-brown text-bakery-brown hover:bg-bakery-cream"
                    >
                      Вхід
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      size="sm" 
                      className="bg-bakery-brown hover:bg-bakery-brown/90 text-white"
                    >
                      Реєстрація
                    </Button>
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
      <footer className="bg-bakery-cream py-6 border-t border-bakery-light-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-base font-bold mb-2 text-bakery-brown">Контакти</h3>
              <p className="text-sm text-gray-700">Телефон: +380 12 345 6789</p>
              <p className="text-sm text-gray-700">Email: info@bakery.ua</p>
            </div>
            <div>
              <h3 className="text-base font-bold mb-2 text-bakery-brown">Адреса</h3>
              <p className="text-sm text-gray-700">вул. Хлібна, 123, м. Київ, 01001, Україна</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-700">© 2025 Хлібобулочні вироби</p>
              <p className="text-sm text-gray-700">Усі права захищено</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
