import { ApiProperty } from '@nestjs/swagger';

export default class RegisterTaskDto {
  @ApiProperty({
    name: 'title',
    type: 'string',
    required: true,
  })
  title: string;
}
