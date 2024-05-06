import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Logger, Param, Patch, Post, Request, UploadedFiles, UseInterceptors } from '@nestjs/common';
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

  @Get('/companys')
  async findAllCompanys(@Request() req: any) {
    try {

      const { sub, type } = req.decoded;
      
      this.logger.debug(`companyId: ${sub}`);

      return await this.visitsService.findAllCompanys(sub);
    } catch (err) {
      throw new InternalServerErrorException('Error retrieving visits', err);
    }
  }
  @Get('/visitors')
  async findAllVisitors(@Request() req: any) {
    try {

      const { sub, type } = req.decoded;
      
      this.logger.debug(`visitorId: ${sub}`);

      return await this.visitsService.findAllVisitors(sub);
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
  async store(
    @Body() data: CreateVisitDTO,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req: any
    ) {
    let filesArr = []
    if(!isEmpty(files)) {
      this.logger.debug(`files len ${files.length || 0}`)
      this.logger.debug(`${files.map(f => `\nmimetype ${f.mimetype}, name ${f.originalname}`)}`)
      filesArr = files.map((file) => ({ name: file.originalname }))
      // const urls = this.uploadService.upload
    }

    const { sub, type } = req.decoded

    data.visitorId = sub
    data.scheduledDate = new Date(data.scheduledDate);
    data.files = filesArr;

    return await this.visitsService.create(data);
  } 
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateVisitDTO, @Request() req: any) {
    const found = await this.visitsService.find(id);

    const { sub, type } = req.decoded;

    if(/companys/.test(type)) {
      if(!found) {
        throw new BadRequestException('Visitante não encontrado');
      }
      else if(found.companyId != sub) {
        throw new BadRequestException('Empresa não autorizada');
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
    }
    else if(/visitors/.test(type)) {
      if(!found) {
        throw new BadRequestException('Visitante não encontrado');
      }
      else if(found.visitorId != sub) {
        throw new BadRequestException('Visitante não autorizado');
      }
      if(data.scheduledDate) {
        data.scheduledDate = new Date(data.scheduledDate);
      }
    }

    this.logger.debug(`id: ${id}, data: ${JSON.stringify(data)}`);

    return await this.visitsService.update(id, data);
  }
}
