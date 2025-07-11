import { ApiProperty } from '@nestjs/swagger';

export default class SingInAuthControllerDto {
  @ApiProperty({
    name: 'username',
    type: 'string',
    required: true,
  })
  username: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    required: true,
  })
  password: string;
}
