import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
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

export class CreateDTO {
  @IsString()
  password: string;
  @IsString()
  fullName: string;
  @IsString()
  email: string;
  @IsDateString()
  birthday: string | Date;
  @IsString()
  identity: string;
  @Matches(/cnpj|cpf/)
  identityType: string;
  @ValidateNested()
  @Transform((text) => JSON.parse(text.value))
  @Type(() => AddresDTO)
  @IsNotEmpty()
  address: AddresDTO;
  url: string;
  @IsNotEmpty()
  @IsString()
  phone: string; 
  @IsNotEmpty()
  @IsString()
  role: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}
