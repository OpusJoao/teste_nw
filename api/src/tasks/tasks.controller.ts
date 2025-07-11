import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import RegisterTaskDto from './dto/register-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() registerTaskDto: RegisterTaskDto, @Req() req: Request) {
    const userId = req?.user?.['sub'];
    return this.tasksService.create(registerTaskDto.title, userId);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req: Request,
  ) {
    const user = req?.user;
    const userId = user?.sub;
    return this.tasksService.findAll(userId, undefined, page, limit);
  }

  @Get('admin')
  findAllAdmin(
    @Query('userId') userId: number,
    @Query('completed') completed: boolean,
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const user = req?.user;
    const userIsAdmin = user?.role == 'admin';
    if (!userIsAdmin)
      throw new UnauthorizedException('Você não tem permissão.');
    return this.tasksService.findAll(userId, completed, page, limit);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('completed') completed: boolean,
    @Req() req: Request,
  ) {
    const userId = req?.user?.['sub'];
    return this.tasksService.update(+id, title, completed, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req?.user?.['sub'];
    return this.tasksService.remove(+id, userId);
  }
}
