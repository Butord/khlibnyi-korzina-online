
import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bread-pattern absolute inset-0 z-0 opacity-40" />
        <div className="relative z-10 py-16 md:py-24 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-bakery-brown mb-4">
            Хлібна Майстерня
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Найсвіжіша хлібобулочна продукція прямо до вашого столу
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/products">
                <Button size="lg" className="gap-2">
                  Перейти до каталогу
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="gap-2">
                    Зареєструватися
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Увійти
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Наші найпопулярніші вироби</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600" 
                  alt="Білий хліб" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Білий хліб</h3>
                <p className="text-muted-foreground mb-4">Класичний білий хліб з пшеничного борошна.</p>
                <p className="text-lg font-bold mb-4">25.00 грн</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">Замовити</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600" 
                  alt="Житній хліб" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Житній хліб</h3>
                <p className="text-muted-foreground mb-4">Традиційний український житній хліб з кислинкою.</p>
                <p className="text-lg font-bold mb-4">30.00 грн</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">Замовити</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600" 
                  alt="Круасан" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Круасан</h3>
                <p className="text-muted-foreground mb-4">Легкий та маслянистий круасан з шарами тіста.</p>
                <p className="text-lg font-bold mb-4">22.00 грн</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">Замовити</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link to="/products">
              <Button variant="outline" size="lg">
                Переглянути всі товари
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Us */}
      <section className="py-16 px-4 bg-bakery-cream/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Про нас</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              "Хлібна Майстерня" – це пекарня з традиціями, де кожен виріб готується з любов'ю та 
              за старовинними рецептами. Наша історія розпочалась понад 10 років тому з невеликої 
              родинної пекарні, а сьогодні ми – улюблена пекарня багатьох українців.
            </p>
            <p className="text-lg mb-6">
              Ми використовуємо тільки натуральні інгредієнти найвищої якості. Кожен день наші 
              майстри-пекарі починають роботу ще до світанку, щоб до ранку наші клієнти отримали 
              свіжу та ароматну випічку.
            </p>
            <p className="text-lg">
              Замовляйте хлібобулочні вироби онлайн і насолоджуйтесь справжнім смаком якісного хліба. 
              Ми доставимо вашу випічку свіжою та теплою прямо до вашого дому.
            </p>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Як це працює?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 bg-bakery-gold/20 flex items-center justify-center rounded-full mx-auto mb-4">
                <span className="text-3xl font-bold text-bakery-brown">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Реєстрація</h3>
              <p className="text-muted-foreground">
                Створіть обліковий запис і дочекайтесь підтвердження від адміністратора
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 bg-bakery-gold/20 flex items-center justify-center rounded-full mx-auto mb-4">
                <span className="text-3xl font-bold text-bakery-brown">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Замовлення</h3>
              <p className="text-muted-foreground">
                Виберіть товари з нашого каталогу та додайте їх до кошика
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 bg-bakery-gold/20 flex items-center justify-center rounded-full mx-auto mb-4">
                <span className="text-3xl font-bold text-bakery-brown">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Отримання</h3>
              <p className="text-muted-foreground">
                Очікуйте на свіжу випічку протягом декількох годин
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-bakery-brown text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Готові замовити свіжу випічку?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Зареєструйтесь зараз і отримайте доступ до нашого повного асортименту хлібобулочних виробів
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/products">
                <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white hover:text-bakery-brown">
                  Перейти до каталогу
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-bakery-brown">
                    Зареєструватися
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg" 
                    className="bg-white text-bakery-brown hover:bg-white/90"
                  >
                    Увійти
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
