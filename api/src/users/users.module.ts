import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { DATA_SOURCE } from '../database/database.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '360s',
        },
      }),
    }),
  ],
  providers: [
    UsersService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: [DATA_SOURCE],
    },
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
