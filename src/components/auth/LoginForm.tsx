import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useAuth();

  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [loginFirstName, setLoginFirstName] = useState('');
  const [loginLastName, setLoginLastName] = useState('');
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  // Register form state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [isRegSubmitting, setIsRegSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginPhone.trim()) {
      toast({
        title: "Помилка",
        description: "Номер телефону обов'язковий для заповнення",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoginSubmitting(true);
    
    try {
      // Тепер ми передаємо телефон як обов'язковий, а ім'я та прізвище як опціональні
      const success = await login(loginPhone, loginFirstName, loginLastName);
      
      if (success) {
        toast({
          title: "Успішно!",
          description: "Ви увійшли в систему"
        });
        navigate('/products');
      } else {
        toast({
          title: "Помилка входу",
          description: "Перевірте ваші дані або ваш акаунт очікує підтвердження",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Виникла помилка під час входу",
        variant: "destructive"
      });
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!regFirstName.trim() || !regLastName.trim() || !regPhone.trim()) {
      toast({
        title: "Помилка",
        description: "Всі поля обов'язкові для заповнення",
        variant: "destructive"
      });
      return;
    }
    
    setIsRegSubmitting(true);
    
    try {
      const success = await register(regFirstName, regLastName, regPhone);
      
      if (success) {
        toast({
          title: "Успішно!",
          description: "Ваша реєстрація очікує підтвердження адміністратора."
        });
        setActiveTab("login");
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
      setIsRegSubmitting(false);
    }
  };

  return (
    <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="login">Вхід</TabsTrigger>
        <TabsTrigger value="register">Реєстра��ія</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loginPhone">Номер телефону</Label>
            <Input
              id="loginPhone"
              value={loginPhone}
              onChange={(e) => setLoginPhone(e.target.value)}
              placeholder="Введіть номер телефону"
              disabled={isLoginSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="loginFirstName">Ім'я</Label>
            <Input
              id="loginFirstName"
              value={loginFirstName}
              onChange={(e) => setLoginFirstName(e.target.value)}
              placeholder="Введіть ім'я"
              disabled={isLoginSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="loginLastName">Прізвище</Label>
            <Input
              id="loginLastName"
              value={loginLastName}
              onChange={(e) => setLoginLastName(e.target.value)}
              placeholder="Введіть прізвище"
              disabled={isLoginSubmitting}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoginSubmitting}>
            {isLoginSubmitting ? "Вхід..." : "Увійти"}
          </Button>
        </form>
      </TabsContent>
      
      <TabsContent value="register">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="regFirstName">Ім'я</Label>
            <Input
              id="regFirstName"
              value={regFirstName}
              onChange={(e) => setRegFirstName(e.target.value)}
              placeholder="Введіть ім'я"
              disabled={isRegSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="regLastName">Прізвище</Label>
            <Input
              id="regLastName"
              value={regLastName}
              onChange={(e) => setRegLastName(e.target.value)}
              placeholder="Введіть прізвище"
              disabled={isRegSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="regPhone">Номер телефону</Label>
            <Input
              id="regPhone"
              value={regPhone}
              onChange={(e) => setRegPhone(e.target.value)}
              placeholder="Введіть номер телефону"
              disabled={isRegSubmitting}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isRegSubmitting}>
            {isRegSubmitting ? "Реєстрація..." : "Зареєструватися"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
