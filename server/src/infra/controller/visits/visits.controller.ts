import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Logger, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { get, isEmpty } from 'lodash';
import { UploadService } from 'src/infra/services/upload/upload.service';
import { VisitsService } from 'src/infra/services/visits/visits.service';
import { CreateVisitDTO, UpdateVisitDTO } from './dto';

@Controller('visits')
export class VisitsController {
  private readonly logger = new Logger(VisitsController.name)

  constructor(
    private readonly visitsService: VisitsService,
    private readonly uploadService: UploadService
    ) {}

  @Get('/companys/:id')
  async index(@Param('id') id: string) {
    try {

      this.logger.debug(`companyId: ${id}`);

      return await this.visitsService.findAll(id);
    } catch (err) {
      throw new InternalServerErrorException('Error retrieving visits', err);
    }
  }
  @Get(':id')
  async show(@Param('id') id: string) {
    try {

      this.logger.debug(`id: ${id}`);

      return await this.visitsService.find(id);
    } catch (err) {
      throw new InternalServerErrorException('Error retrieving visits', err);
    }
  }
  
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async store(@Body() data: CreateVisitDTO,
    @UploadedFiles() files: Array<Express.Multer.File>) {
    if(!isEmpty(files)) {
      this.logger.debug(`files len ${files.length || 0}`)
      this.logger.debug(`${files.map(f => `\nmimetype ${f.mimetype}, name ${f.originalname}`)}`)
      // const urls = this.uploadService.upload
    }
    // return await this.visitsService.create({});
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateVisitDTO) {
    const found = await this.visitsService.find(id);
    if(!found) {
      throw new BadRequestException('Visitante não encontrado');
    }
    else if(found.finished) {
      throw new BadRequestException('Não é possível mudar uma visita já finalizada')
    }
    else if(!isEmpty(get(data, 'approved')) && found.approved && !get(data, 'approved')) {
      throw new BadRequestException('Não é possível rejeitar um visitante já aprovado')
    }
    else if(found.approved == get(data, 'approved')) {
      throw new BadRequestException(`Visitante já ${found.approved ? 'aprovado' : 'rejeitado'}`)
    }
    else if(found.finished == get(data, 'finished')) {
      throw new BadRequestException(`Visitante já finalizado`)
    }

    this.logger.debug(`id: ${id}, data: ${JSON.stringify(data)}`);

    return await this.visitsService.update(id, data);
  }
}
