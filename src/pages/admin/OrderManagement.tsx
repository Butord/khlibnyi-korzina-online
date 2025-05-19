
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { Order } from '@/types';
import { getOrders, updateOrderStatus } from '@/services/orderService';
import { getUserById } from '@/services/userService';
import { ChevronDown, Eye, Loader2 } from 'lucide-react';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState<string>('');

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося завантажити список замовлень",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: number, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    try {
      setIsProcessing(true);
      const success = await updateOrderStatus(orderId, status);
      
      if (success) {
        // Update orders list
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? { ...order, status } : order))
        );
        
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status });
        }
        
        toast({
          title: "Успішно",
          description: "Статус замовлення оновлено"
        });
      } else {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося оновити статус замовлення",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const openOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
    
    try {
      const user = await getUserById(order.userId);
      if (user) {
        setCustomerName(`${user.firstName} ${user.lastName}`);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">В обробці</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Підтверджено</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Виконано</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Скасовано</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Управління замовленнями</h1>
          <Button onClick={loadOrders} variant="outline" disabled={isLoading}>
            Оновити
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Список замовлень</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>К-сть товарів</TableHead>
                    <TableHead>Сума</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          {format(new Date(order.createdAt), 'dd.MM.yyyy HH:mm')}
                        </TableCell>
                        <TableCell>
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </TableCell>
                        <TableCell>{order.totalAmount.toFixed(2)} грн</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild disabled={isProcessing}>
                              <Button variant="outline" size="sm" className="ml-2">
                                Статус <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Змінити статус</DropdownMenuLabel>
                              {order.status !== 'pending' && (
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(order.id, 'pending')}
                                >
                                  В обробці
                                </DropdownMenuItem>
                              )}
                              {order.status !== 'confirmed' && (
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(order.id, 'confirmed')}
                                >
                                  Підтверджено
                                </DropdownMenuItem>
                              )}
                              {order.status !== 'completed' && (
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(order.id, 'completed')}
                                >
                                  Виконано
                                </DropdownMenuItem>
                              )}
                              {order.status !== 'cancelled' && (
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(order.id, 'cancelled')}
                                  className="text-destructive"
                                >
                                  Скасовано
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        Немає замовлень
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        {selectedOrder && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>Деталі замовлення №{selectedOrder.id}</span>
                  {getStatusBadge(selectedOrder.status)}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Клієнт</h3>
                    <p className="text-sm">{customerName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Дата</h3>
                    <p className="text-sm">
                      {format(new Date(selectedOrder.createdAt), 'dd.MM.yyyy HH:mm')}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Товари</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Назва</TableHead>
                        <TableHead className="text-right">Ціна</TableHead>
                        <TableHead className="text-right">К-сть</TableHead>
                        <TableHead className="text-right">Сума</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.product.id}>
                          <TableCell>{item.product.name}</TableCell>
                          <TableCell className="text-right">
                            {item.product.price.toFixed(2)} грн
                          </TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            {(item.product.price * item.quantity).toFixed(2)} грн
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-semibold">Всього:</span>
                  <span className="font-bold text-xl">
                    {selectedOrder.totalAmount.toFixed(2)} грн
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Змінити статус</h3>
                  <div className="flex gap-2">
                    {selectedOrder.status !== 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedOrder.id, 'pending')}
                        disabled={isProcessing}
                      >
                        В обробці
                      </Button>
                    )}
                    {selectedOrder.status !== 'confirmed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedOrder.id, 'confirmed')}
                        disabled={isProcessing}
                      >
                        Підтверджено
                      </Button>
                    )}
                    {selectedOrder.status !== 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedOrder.id, 'completed')}
                        disabled={isProcessing}
                      >
                        Виконано
                      </Button>
                    )}
                    {selectedOrder.status !== 'cancelled' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleStatusChange(selectedOrder.id, 'cancelled')}
                        disabled={isProcessing}
                      >
                        Скасовано
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrderManagement;
