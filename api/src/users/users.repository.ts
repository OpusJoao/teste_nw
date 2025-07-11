import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepositoryInterface } from './users.repository.interface';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<User>,
  ) {}

  async createUser(
    username: string,
    password: string,
    role = 'user',
  ): Promise<User> {
    const hashedPassword = hashSync(password, 10);
    const user = this.repository.create({
      username,
      password: hashedPassword,
      role,
      active: true,
    });
    return await this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.repository.findOneBy({
      username,
    });

    return user;
  }

  async updateUser(
    id: number,
    updateData: Partial<User>,
  ): Promise<Partial<User>> {
    const user = await this.repository.findOneBy({
      id,
    });
    if (!user?.id) throw new Error('User não foi encontrado');
    Object.assign(user, updateData);
    return await this.repository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
