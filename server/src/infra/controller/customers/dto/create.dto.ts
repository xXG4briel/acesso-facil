import { Type } from 'class-transformer';
import {
  IsDate,
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
  fullName: string;
  @IsString()
  email: string;
  @IsDateString()
  birthday: string;
  @IsString()
  identity: string;
  @Matches(/cnpj|cpf/)
  identityType: string;
  @ValidateNested()
  @Type(() => AddresDTO)
  @IsNotEmpty()
  address: AddresDTO;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}
