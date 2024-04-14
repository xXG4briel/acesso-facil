import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

class AddresDTO {
  @IsString()
  city: string;
  @IsString()
  uf: string;
  @IsString()
  address: string;
  @IsString()
  zipCode: string;
}

export class RegisterPayload {
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  identity: string;
  @Matches(/cnpj|cpf/)
  identityType: string;
  @ValidateNested()
  @Type(() => AddresDTO)
  @IsNotEmpty()
  address: AddresDTO;
}
