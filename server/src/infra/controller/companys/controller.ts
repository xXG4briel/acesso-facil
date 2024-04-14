import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CompanysService } from 'src/infra/services/companys/companys.service';
import { RegisterPayload } from './dto';
import { hashSync } from 'bcrypt-nodejs'
@Controller('companys')
export class CompanysController {
  constructor(private readonly companysService: CompanysService) {}

  @Post()
  async register(@Body() body: RegisterPayload) {
    const found = await this.companysService.findByEmailOrIdentity(body);
    if (found) {
      throw new BadRequestException(
        `${found?.email == body.email ? 'E-mail' : found.identityType.toUpperCase()} já cadastrado`,
      );
    }

    body.password = hashSync(body.password);

    const result = await this.companysService.create(body);

    if (!result) {
      throw new InternalServerErrorException(
        'Não foi possível registar a empresa',
      );
    }

    return result;
  }
}
