import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/auth';

const USERS_KEY = 'fletx_users';

const hashPassword = (password: string): string => {
  return `hashed_${password}`;
};

export const usersStorage = {
  async getAll(): Promise<User[]> {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const users = await this.getAll();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  async create(email: string, password: string): Promise<User> {
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new Error('Email is already registered.');
    }

    const newUser: User = {
      id: uuidv4(),
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    const users = await this.getAll();
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },

  async validateCredentials(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error('User not found.');
    }
    if (user.passwordHash !== hashPassword(password)) {
      throw new Error('Invalid credentials.');
    }
    return user;
  },
};
