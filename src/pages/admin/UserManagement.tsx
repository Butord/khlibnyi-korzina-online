
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';
import { getUsers, approveUser, rejectUser } from '@/services/userService';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingUser, setProcessingUser] = useState<number | null>(null);
  const { toast } = useToast();

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося завантажити список користувачів",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApproveUser = async (userId: number) => {
    try {
      setProcessingUser(userId);
      const success = await approveUser(userId);
      
      if (success) {
        toast({
          title: "Успішно",
          description: "Користувача підтверджено"
        });
        
        // Update users list
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, isApproved: true } : user
        ));
      } else {
        throw new Error("Failed to approve user");
      }
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося підтвердити користувача",
        variant: "destructive"
      });
    } finally {
      setProcessingUser(null);
    }
  };

  const handleRejectUser = async (userId: number) => {
    try {
      setProcessingUser(userId);
      const success = await rejectUser(userId);
      
      if (success) {
        toast({
          title: "Успішно",
          description: "Користувача відхилено"
        });
        
        // Update users list
        setUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        throw new Error("Failed to reject user");
      }
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося відхилити користувача",
        variant: "destructive"
      });
    } finally {
      setProcessingUser(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Управління користувачами</h1>
          <Button onClick={loadUsers} variant="outline" disabled={isLoading}>
            Оновити
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Список користувачів</CardTitle>
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
                    <TableHead>Ім'я</TableHead>
                    <TableHead>Прізвище</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          {user.isApproved ? (
                            <Badge className="bg-green-500 hover:bg-green-600">Підтверджено</Badge>
                          ) : (
                            <Badge variant="secondary">Очікує</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {user.isAdmin ? (
                            <Badge variant="default">Адміністратор</Badge>
                          ) : (
                            <Badge variant="outline">Користувач</Badge>
                          )}
                        </TableCell>
                        <TableCell className="flex justify-end gap-2">
                          {!user.isApproved && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleApproveUser(user.id)}
                                disabled={processingUser === user.id}
                              >
                                {processingUser === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-4 w-4" />
                                )}
                                Підтвердити
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="gap-1"
                                    disabled={processingUser === user.id}
                                  >
                                    <XCircle className="h-4 w-4" />
                                    Відхилити
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Відхилити користувача?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Ви впевнені, що хочете відхилити заявку цього користувача? Цю дію неможливо скасувати.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Скасувати</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleRejectUser(user.id)}
                                    >
                                      Відхилити
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        Немає користувачів
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
