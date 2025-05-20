
import { User } from "../types";
import { db } from "./databaseService";

// Mock user data (in a real app, this would come from an API)
export const MOCK_USERS: User[] = [
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
  // Use the database service
  return db.getUsers();
};

export const getUserById = async (id: number): Promise<User | null> => {
  // Use the database service
  return db.getUserById(id);
};

export const getUserByPhone = async (phone: string): Promise<User | null> => {
  console.log("Looking for user with phone:", phone);
  // Use the database service
  const user = await db.getUserByPhone(phone);
  console.log("Found user:", user);
  return user;
};

export const approveUser = async (id: number): Promise<boolean> => {
  // Use the database service
  return db.approveUser(id);
};

export const rejectUser = async (id: number): Promise<boolean> => {
  // Use the database service
  return db.rejectUser(id);
};

export const saveUser = async (user: User): Promise<User> => {
  // Use the database service
  return db.saveUser(user);
};
