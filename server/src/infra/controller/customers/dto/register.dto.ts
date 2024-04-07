import { IsString } from 'class-validator';

export class RegisterDTO {
  @IsString()
  id: string;
}
