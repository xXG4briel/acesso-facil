import {
  IsString,
} from 'class-validator';

export class LoginPayload {
  @IsString()
  password: string;
  @IsString()
  email: string;
}
