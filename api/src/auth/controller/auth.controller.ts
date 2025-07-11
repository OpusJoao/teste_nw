import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import SingInAuthControllerDto from './dto/sign-in-auth-controller.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SingInAuthControllerDto) {
    return this.authService.signIn(signInDto?.username, signInDto?.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não fornecido');
    }
    return this.authService.refreshToken(refreshToken);
  }
}
