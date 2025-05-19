
import { Product } from "../types";

// Mock product data (in a real app, this would come from an API)
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Білий хліб",
    description: "Класичний білий хліб з пшеничного борошна.",
    price: 25.00,
    imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=300",
    category: "Хліб",
    available: true
  },
  {
    id: 2,
    name: "Житній хліб",
    description: "Традиційний український житній хліб з кислинкою.",
    price: 30.00,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300",
    category: "Хліб",
    available: true
  },
  {
    id: 3,
    name: "Багет",
    description: "Хрусткий французький багет з м'якушкою всередині.",
    price: 28.00,
    imageUrl: "https://images.unsplash.com/photo-1603363615752-7f7e9c8a75f8?q=80&w=300",
    category: "Хліб",
    available: true
  },
  {
    id: 4,
    name: "Круасан",
    description: "Легкий та маслянистий круасан з шарами тіста.",
    price: 22.00,
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=300",
    category: "Випічка",
    available: true
  },
  {
    id: 5,
    name: "Булочка з маком",
    description: "Солодка булочка з щедрою начинкою з маку.",
    price: 18.00,
    imageUrl: "https://images.unsplash.com/photo-1587830330179-a2b309b0a41a?q=80&w=300",
    category: "Випічка",
    available: true
  },
  {
    id: 6,
    name: "Пиріг з вишнею",
    description: "Соковитий пиріг з вишневою начинкою і ніжною скоринкою.",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1525151498231-bc059cfafa2b?q=80&w=300",
    category: "Десерти",
    available: true
  }
];

export const getProducts = async (): Promise<Product[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS);
    }, 500);
  });
};

export const getProductById = async (id: number): Promise<Product | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find((product) => product.id === id) || null;
      resolve(product);
    }, 300);
  });
};

export const getProductCategories = async (): Promise<string[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = Array.from(new Set(MOCK_PRODUCTS.map((product) => product.category)));
      resolve(categories);
    }, 300);
  });
};

export const saveProduct = async (product: Product): Promise<Product> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (product.id) {
        // Update existing product
        const index = MOCK_PRODUCTS.findIndex((p) => p.id === product.id);
        if (index !== -1) {
          MOCK_PRODUCTS[index] = product;
        }
      } else {
        // Add new product
        const newProduct = {
          ...product,
          id: Math.max(...MOCK_PRODUCTS.map((p) => p.id)) + 1
        };
        MOCK_PRODUCTS.push(newProduct);
        product = newProduct;
      }
      resolve(product);
    }, 500);
  });
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
      if (index !== -1) {
        MOCK_PRODUCTS.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};
