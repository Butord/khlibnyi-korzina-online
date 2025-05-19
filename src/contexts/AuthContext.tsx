
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (phone: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  register: (firstName: string, lastName: string, phone: string) => Promise<boolean>;
  isLoading: boolean;
}

// Mock user data (in a real app, this would come from a database)
const MOCK_USERS: User[] = [
  {
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    phone: '1234567890',
    isApproved: true,
    isAdmin: true
  },
  {
    id: 2,
    firstName: 'Test',
    lastName: 'Customer',
    phone: '0987654321',
    isApproved: true,
    isAdmin: false
  }
];

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

  const login = async (phone: string, firstName: string, lastName: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.phone === phone
        );
        
        if (foundUser) {
          if (!foundUser.isApproved) {
            setIsLoading(false);
            resolve(false);
            return;
          }
          
          setUser(foundUser);
          localStorage.setItem('bakeryUser', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve(true);
          return;
        }
        
        setIsLoading(false);
        resolve(false);
      }, 1000);
    });
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
