
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Menu, Facebook, Instagram, Youtube } from 'lucide-react';
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
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Mobile Menu */}
            <div className="block lg:hidden self-start">
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

            {/* Main Navigation - Left Side */}
            <div className="hidden lg:flex items-center gap-8 text-foreground">
              <Link to="/" className="font-medium hover:text-primary transition-colors">
                ПРО НАС
              </Link>
              <Link to="/products" className="font-medium hover:text-primary transition-colors">
                ПРОДУКТИ
              </Link>
              <Link to="#" className="font-medium hover:text-primary transition-colors">
                ДЕ ПРИДБАТИ
              </Link>
            </div>

            {/* Logo - Center */}
            <div className="my-4 lg:my-0">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary text-white h-16 w-16 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">Хліб</span>
                </div>
              </Link>
            </div>

            {/* Right Side Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="#" className="font-medium hover:text-primary transition-colors">
                НОВИНИ
              </Link>
              <Link to="#" className="font-medium hover:text-primary transition-colors">
                КОНТАКТИ
              </Link>
              
              <div className="flex items-center gap-3">
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Instagram size={20} />
                </a>

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
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Контакти</h3>
              <p className="mb-2">Телефон: +380 12 345 6789</p>
              <p>Email: info@bakery.ua</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Адреса</h3>
              <p>вул. Хлібна, 123<br />м. Київ, 01001<br />Україна</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Соціальні мережі</h3>
              <div className="flex gap-4">
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Youtube size={24} />
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-300 text-center">
            <p>© 2025 Хлібобулочні вироби. Усі права захищено.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
