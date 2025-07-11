import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'username',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiHideProperty()
  @ApiProperty({
    name: 'role',
    type: 'string',
    required: false,
  })
  @IsString()
  role?: string;
}
