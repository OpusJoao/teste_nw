import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly usersService: UsersService) {}

  async seedAdminUser() {
    const adminUser = await this.usersService.findOne('admin');
    if (adminUser) {
      this.logger.log('Usuário admin já existe, não será criado novamente.');
      return;
    }

    await this.usersService.create({
      username: 'admin',
      password: 'admin123@#',
      role: 'admin',
    });

    this.logger.log('Usuário admin criado com sucesso!');
  }
}
