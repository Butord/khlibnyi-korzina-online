
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MainLayout } from './MainLayout';
import { Users, ShoppingBag, List, Home } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is admin
  React.useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return null;
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <div>
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Адміністрування</h2>
            <nav className="space-y-2">
              <Link to="/admin/users">
                <Button
                  variant={isActive('/admin/users') ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Користувачі
                </Button>
              </Link>
              <Link to="/admin/products">
                <Button
                  variant={isActive('/admin/products') ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Товари
                </Button>
              </Link>
              <Link to="/admin/orders">
                <Button
                  variant={isActive('/admin/orders') ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  <List className="mr-2 h-4 w-4" />
                  Замовлення
                </Button>
              </Link>
              <Separator />
              <Link to="/">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Home className="mr-2 h-4 w-4" />
                  На головну
                </Button>
              </Link>
            </nav>
          </Card>
        </div>
        <div>
          {children}
        </div>
      </div>
    </MainLayout>
  );
};
