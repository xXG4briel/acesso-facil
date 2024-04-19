import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { VisitsService } from 'src/infra/services/visits/visits.service';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get()
  async index() {
    try {
      return await this.visitsService.findAll();
    } catch (err) {
      throw new InternalServerErrorException('Error retrieving visits', err);
    }
  }
}
