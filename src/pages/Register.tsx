
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MainLayout } from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      toast({
        title: "Помилка",
        description: "Всі поля обов'язкові для заповнення",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await register(firstName, lastName, phone);
      
      if (success) {
        toast({
          title: "Успішно!",
          description: "Ваша реєстрація очікує підтвердження адміністратора. Ми повідомимо вас, коли ваш акаунт буде активовано."
        });
        navigate('/login');
      } else {
        toast({
          title: "Помилка",
          description: "Користувач з таким номером телефону вже існує",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Виникла помилка під час реєстрації",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="flex justify-center items-center pt-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Реєстрація</CardTitle>
            <CardDescription className="text-center">
              Створіть обліковий запис для замовлення хлібобулочних виробів
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ім'я</Label>
                <Input
                  id="firstName"
                  placeholder="Введіть ім'я"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Прізвище</Label>
                <Input
                  id="lastName"
                  placeholder="Введіть прізвище"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефону</Label>
                <Input
                  id="phone"
                  placeholder="Введіть номер телефону"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
              </Button>
              
              <div className="text-center text-sm">
                Вже маєте обліковий запис?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Увійти
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Register;
