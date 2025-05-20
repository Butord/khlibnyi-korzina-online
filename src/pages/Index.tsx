
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Facebook, Instagram, Youtube } from 'lucide-react';

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
      <section className="py-10 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Замовлення хлібобулочних і здобних виробів
            </h1>
            <p className="text-lg mb-8">
              Якість та смак, які ви заслуговуєте. Зручне замовлення та швидка доставка.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/register')} 
                className="bakery-button"
              >
                Реєстрація
              </Button>
              <Button 
                onClick={() => navigate('/login')} 
                className="bg-white border-2 border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-full text-lg font-medium transition-colors"
              >
                Вхід
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary rounded-lg p-4 transform rotate-2">
                <img src="/placeholder.svg" alt="Хліб" className="w-full h-40 object-cover rounded" />
              </div>
              <div className="bg-secondary rounded-lg p-4 transform -rotate-1">
                <img src="/placeholder.svg" alt="Булочки" className="w-full h-40 object-cover rounded" />
              </div>
              <div className="bg-secondary rounded-lg p-4 transform -rotate-2">
                <img src="/placeholder.svg" alt="Пиріжки" className="w-full h-40 object-cover rounded" />
              </div>
              <div className="bg-secondary rounded-lg p-4 transform rotate-1">
                <img src="/placeholder.svg" alt="Здоба" className="w-full h-40 object-cover rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="stat-item">
              <div className="stat-number">100</div>
              <div className="stat-text">видів хлібобулочних і здобних виробів</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">400</div>
              <div className="stat-text">кваліфікованих працівників</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10</div>
              <div className="stat-text">областей, у які доставляємо продукцію</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Про нас</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Наша пекарня постачає хлібобулочні та здобні вироби найвищої якості. 
            Ми використовуємо тільки натуральні інгредієнти та дотримуємося 
            традиційних рецептів, додаючи інновації, щоб задовольнити смак кожного клієнта.
          </p>
          <Button className="bakery-button">Дізнатися більше</Button>
        </div>
      </section>

      {/* Social Media */}
      <section className="bg-secondary py-10 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center gap-6">
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              <Youtube size={32} />
            </a>
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              <Facebook size={32} />
            </a>
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              <Instagram size={32} />
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
