import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryInterface } from './users.repository.interface';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly userRepository: UsersRepositoryInterface,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return await this.userRepository.findByUsername(username);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async create(createUserDto: {
    username: string;
    password: string;
    role?: string;
  }): Promise<User> {
    const user = await this.userRepository.findByUsername(
      createUserDto.username,
    );

    if (user?.id) throw new BadRequestException('Usuário já existe');

    return this.userRepository.createUser(
      createUserDto.username,
      createUserDto.password,
      createUserDto.role,
    );
  }
}
