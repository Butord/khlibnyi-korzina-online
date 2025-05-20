
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getUserByPhone, MOCK_USERS } from '../services/userService';

interface AuthContextType {
  user: User | null;
  login: (phone: string, firstName?: string, lastName?: string) => Promise<boolean>;
  logout: () => void;
  register: (firstName: string, lastName: string, phone: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('bakeryUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, firstName?: string, lastName?: string): Promise<boolean> => {
    setIsLoading(true);
    console.log("Login attempt with:", { phone, firstName, lastName });
    
    try {
      // Спробуємо знайти користувача лише за номером телефону
      const foundUser = await getUserByPhone(phone);
      
      if (foundUser) {
        console.log("Found user by phone:", foundUser);
        
        if (!foundUser.isApproved) {
          console.log("User is not approved");
          setIsLoading(false);
          return false;
        }
        
        setUser(foundUser);
        localStorage.setItem('bakeryUser', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      }
      
      // Якщо не знайдено за телефоном, перевіряємо додатково ім'я та прізвище
      if (firstName && lastName) {
        // Спочатку перевіримо адміністратора (особливий випадок)
        if (phone === '1234567890' && firstName === 'Admin' && lastName === 'User') {
          const adminUser = {
            id: 1,
            firstName: 'Admin',
            lastName: 'User',
            phone: '1234567890',
            isApproved: true,
            isAdmin: true
          };
          
          console.log("Admin login successful");
          setUser(adminUser);
          localStorage.setItem('bakeryUser', JSON.stringify(adminUser));
          setIsLoading(false);
          return true;
        }
      }
      
      console.log("Login failed - user not found");
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (firstName: string, lastName: string, phone: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find(u => u.phone === phone);
        
        if (existingUser) {
          setIsLoading(false);
          resolve(false);
          return;
        }
        
        const newUser: User = {
          id: MOCK_USERS.length + 1,
          firstName,
          lastName,
          phone,
          isApproved: false,
          isAdmin: false
        };
        
        MOCK_USERS.push(newUser);
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bakeryUser');
  };

  const value = {
    user,
    login,
    logout,
    register,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
