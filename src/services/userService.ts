
import { User } from "../types";

// Mock user data (in a real app, this would come from an API)
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
  },
  {
    id: 3,
    firstName: 'Pending',
    lastName: 'User',
    phone: '1122334455',
    isApproved: false,
    isAdmin: false
  }
];

export const getUsers = async (): Promise<User[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_USERS]);
    }, 500);
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_USERS.find((user) => user.id === id) || null;
      resolve(user ? { ...user } : null);
    }, 300);
  });
};

export const approveUser = async (id: number): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = MOCK_USERS.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        resolve(false);
        return;
      }
      
      MOCK_USERS[userIndex].isApproved = true;
      resolve(true);
    }, 500);
  });
};

export const rejectUser = async (id: number): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = MOCK_USERS.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        resolve(false);
        return;
      }
      
      MOCK_USERS.splice(userIndex, 1);
      resolve(true);
    }, 500);
  });
};

export const saveUser = async (user: User): Promise<User> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (user.id) {
        // Update existing user
        const index = MOCK_USERS.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          MOCK_USERS[index] = { ...user };
          resolve({ ...user });
          return;
        }
      }
      
      // Add new user
      const newUser = {
        ...user,
        id: Math.max(...MOCK_USERS.map((u) => u.id)) + 1
      };
      MOCK_USERS.push(newUser);
      resolve({ ...newUser });
    }, 500);
  });
};
