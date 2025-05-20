
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to products page
    if (user && !isLoading) {
      navigate('/products');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <p>Завантаження...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 px-4 bg-bakery-cream">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-bakery-brown">
              Замовлення хлібобулочних виробів
            </h1>
            <p className="text-base mb-6 text-gray-700">
              Якість та смак, які ви заслуговуєте. Зручне замовлення та швидка доставка.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/register')} 
                className="bg-bakery-brown hover:bg-bakery-brown/90 text-white"
              >
                Реєстрація
              </Button>
              <Button 
                onClick={() => navigate('/login')} 
                variant="outline"
                className="border-bakery-brown text-bakery-brown hover:bg-bakery-cream"
              >
                Вхід
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img src="/placeholder.svg" alt="Хлібобулочні вироби" className="w-full rounded-md shadow-md" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-bakery-light-cream py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-bakery-brown">100</div>
              <div className="text-gray-700">видів виробів</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-bakery-brown">400</div>
              <div className="text-gray-700">працівників</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-bakery-brown">10</div>
              <div className="text-gray-700">областей доставки</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-bakery-brown">Про нас</h2>
          <p className="text-base max-w-2xl mx-auto mb-6 text-gray-700">
            Наша пекарня постачає хлібобулочні та здобні вироби найвищої якості. 
            Ми використовуємо тільки натуральні інгредієнти та дотримуємося 
            традиційних рецептів.
          </p>
          <Button className="bg-bakery-brown hover:bg-bakery-brown/90 text-white">
            Дізнатися більше
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
