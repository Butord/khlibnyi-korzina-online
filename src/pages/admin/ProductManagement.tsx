
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Product } from '@/types';
import { getProducts, saveProduct, deleteProduct } from '@/services/productService';
import { Edit, Trash, Plus, Loader2 } from 'lucide-react';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(true);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося завантажити список товарів",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setCategory('');
    setAvailable(true);
    setCurrentProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl);
    setCategory(product.category);
    setAvailable(product.available);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !price || !category) {
      toast({
        title: "Помилка",
        description: "Всі поля, крім зображення, обов'язкові",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const productData: Product = {
        id: currentProduct?.id || 0,
        name,
        description,
        price: parseFloat(price),
        imageUrl: imageUrl || '/placeholder.svg',
        category,
        available
      };
      
      const savedProduct = await saveProduct(productData);
      
      if (currentProduct) {
        // Update existing product in the list
        setProducts(prev => prev.map(p => p.id === savedProduct.id ? savedProduct : p));
        toast({
          title: "Успішно",
          description: "Товар оновлено"
        });
      } else {
        // Add new product to the list
        setProducts(prev => [...prev, savedProduct]);
        toast({
          title: "Успішно",
          description: "Новий товар додано"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося зберегти товар",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const success = await deleteProduct(productId);
      
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        toast({
          title: "Успішно",
          description: "Товар видалено"
        });
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося видалити товар",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Управління товарами</h1>
          <div className="flex gap-2">
            <Button onClick={loadProducts} variant="outline" disabled={isLoading}>
              Оновити
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Додати товар
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {currentProduct ? 'Редагувати товар' : 'Додати новий товар'}
                  </DialogTitle>
                  <DialogDescription>
                    Заповніть форму нижче, щоб {currentProduct ? 'оновити' : 'додати'} товар.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Назва</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Назва товару"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Опис</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Опис товару"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Ціна</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="0.00"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Категорія</Label>
                        <Input
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="Категорія"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">URL зображення</Label>
                      <Input
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="available"
                        checked={available}
                        onCheckedChange={setAvailable}
                      />
                      <Label htmlFor="available">В наявності</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        setIsDialogOpen(false);
                      }}
                    >
                      Скасувати
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      {currentProduct ? 'Оновити' : 'Додати'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Список товарів</CardTitle>
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
                    <TableHead>Назва</TableHead>
                    <TableHead>Категорія</TableHead>
                    <TableHead>Ціна</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden bg-muted">
                              <img
                                src={product.imageUrl || '/placeholder.svg'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span>{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price.toFixed(2)} грн</TableCell>
                        <TableCell>
                          {product.available ? (
                            <Badge className="bg-green-500 hover:bg-green-600">В наявності</Badge>
                          ) : (
                            <Badge variant="secondary">Немає в наявності</Badge>
                          )}
                        </TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Видалити товар?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Ви впевнені, що хочете видалити товар "{product.name}"? Цю дію неможливо скасувати.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Скасувати</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Видалити
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        Немає товарів
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

export default ProductManagement;
