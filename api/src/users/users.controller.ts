import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Req() req: Request) {
    const isAdmin = req?.user?.role === 'admin';
    if (!isAdmin)
      throw new UnauthorizedException('Você não possui permissão para isso.');
    return this.usersService.findAll();
  }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const isAdmin = req?.user?.role === 'admin';
    if (!isAdmin)
      throw new UnauthorizedException('Você não possui permissão para isso.');
    return this.usersService.create(createUserDto);
  }
}
