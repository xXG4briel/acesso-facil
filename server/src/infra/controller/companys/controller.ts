import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CompanysService } from 'src/infra/services/companys/companys.service';
import { RegisterPayload } from './dto';
import { hashSync } from 'bcrypt-nodejs';
@Controller('companys')
export class CompanysController {
  private readonly logger = new Logger(CompanysController.name);
  
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

  @Get()
  async findAll() {
    return await this.companysService.findAll();
  }

  @Post('/visit')
  async createVisit(@Body() body: unknown, @Request() req: any) {
    const { sub, type } = req.decoded;
      
    const result = await this.companysService.createVisit(body, sub);

    if (!result.success) {
      throw new BadRequestException(result.message);
    }
  }

  @Put('/visit/:id')
  async updateVisit(@Body() body: unknown, @Request() req: any, @Param('id') id: string) {
    const { sub, type } = req.decoded;
      
    const result = await this.companysService.updateVisit(id, body, sub);

    if (!result.success) {
      throw new BadRequestException(result.message);
    }
  }
}
