import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{
    username: string;
    userId: number;
    accessToken: string;
    refreshToken: string;
    role: string;
  }> {
    const user = await this.usersService.findOne(username);
    if (compareSync(user?.password || '', pass)) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user?.id,
      username: user?.username,
      role: user?.role,
    };
    return {
      username: user?.username || '',
      role: user?.role || '',
      userId: user?.id || -1,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_EXPIRES_IN || '360s',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
      }),
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        ignoreExpiration: false,
      });

      const newAccessToken = this.jwtService.sign(
        { username: payload.username, sub: payload.sub, role: payload.role },
        { expiresIn: process.env.JWT_EXPIRES_IN || '360s' },
      );

      return { accessToken: newAccessToken };
    } catch (e) {
      console.log(e.message);
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
