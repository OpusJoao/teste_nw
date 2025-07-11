import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../database/database.providers';
import { Task } from './task.entity';
import { DatabaseModule } from '../database/database.module';
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
    TasksService,
    {
      provide: 'TASK_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
      inject: [DATA_SOURCE],
    },
    {
      provide: 'TasksRepositoryInterface',
      useClass: TasksRepository,
    },
  ],
  controllers: [TasksController],
})
export class TasksModule {}
