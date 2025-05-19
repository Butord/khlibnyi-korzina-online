
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-bakery-cream shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/placeholder.svg" 
              alt="Логотип пекарні" 
              className="h-10 w-10 rounded-full bg-bakery-brown"
            />
            <h1 className="text-2xl font-bold text-bakery-brown">Хлібна Майстерня</h1>
          </Link>
          
          {/* Mobile menu */}
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-5 w-5" />
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                      <Separator />
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
                        variant="destructive" 
                        onClick={logout}
                        className="flex items-center gap-2"
                      >
                        <LogOut className="h-5 w-5" />
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
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <Link to="/products">
                  <Button variant="ghost">Каталог</Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white px-1.5 py-0.5 rounded-full text-xs">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
                {user.isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline">Адмін панель</Button>
                  </Link>
                )}
                <Button 
                  variant="destructive" 
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  Вихід
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Вхід</Button>
                </Link>
                <Link to="/register">
                  <Button>Реєстрація</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-bakery-brown text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Хлібна Майстерня</h3>
              <p>Найсвіжіша хлібна продукція для вас та вашої родини.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакти</h3>
              <p>Телефон: +380 00 000 0000</p>
              <p>Email: info@bakery.com</p>
              <p>Адреса: вул. Затишна, 123, м. Київ</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Години роботи</h3>
              <p>Пн-Пт: 7:00 - 20:00</p>
              <p>Сб-Нд: 8:00 - 18:00</p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>© 2025 Хлібна Майстерня. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
