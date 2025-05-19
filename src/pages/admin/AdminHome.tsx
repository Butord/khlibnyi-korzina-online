
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUsers } from '@/services/userService';
import { getProducts } from '@/services/productService';
import { getOrders } from '@/services/orderService';
import { Users, ShoppingBag, ClipboardList, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHome: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const users = await getUsers();
        setTotalUsers(users.length);
        setPendingUsers(users.filter(user => !user.isApproved).length);
        
        // Fetch products
        const products = await getProducts();
        setTotalProducts(products.length);
        
        // Fetch orders
        const orders = await getOrders();
        setTotalOrders(orders.length);
        setPendingOrders(orders.filter(order => order.status === 'pending').length);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Адмін панель</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Користувачі</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {pendingUsers} очікують підтвердження
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Товари</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Всього в каталозі
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Замовлення</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {pendingOrders} очікують обробки
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Статус</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Активно</div>
              <p className="text-xs text-muted-foreground">
                Система працює справно
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Швидкі дії</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Керування користувачами</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Схвалюйте нових користувачів та керуйте існуючими
                </p>
                <Link to="/admin/users">
                  <button className="text-sm text-primary hover:underline">
                    Перейти до користувачів →
                  </button>
                </Link>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Керування товарами</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Додавайте, редагуйте та видаляйте товари з каталогу
                </p>
                <Link to="/admin/products">
                  <button className="text-sm text-primary hover:underline">
                    Перейти до товарів →
                  </button>
                </Link>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Керування замовленнями</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Переглядайте та обробляйте замовлення
                </p>
                <Link to="/admin/orders">
                  <button className="text-sm text-primary hover:underline">
                    Перейти до замовлень →
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Довідка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Інструкція для адміністратора</h3>
                <p className="text-sm text-muted-foreground">
                  В адміністративній панелі ви можете:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                  <li>Підтверджувати нових користувачів</li>
                  <li>Додавати та редагувати товари в каталозі</li>
                  <li>Переглядати та обробляти замовлення</li>
                  <li>Змінювати статус замовлень</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Статуси замовлень</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><span className="font-medium">В обробці</span> - нове замовлення</li>
                  <li><span className="font-medium">Підтверджено</span> - замовлення прийняте</li>
                  <li><span className="font-medium">Виконано</span> - замовлення доставлене</li>
                  <li><span className="font-medium">Скасовано</span> - замовлення відмінене</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHome;
