import { User } from './user.entity';

export interface UsersRepositoryInterface {
  createUser(username: string, password: string, role?: string): Promise<User>;
  findAll(): Promise<Partial<User>[]>;
  findById(id: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  updateUser(id: number, updateData: Partial<User>): Promise<Partial<User>>;
  deleteUser(id: number): Promise<void>;
}
