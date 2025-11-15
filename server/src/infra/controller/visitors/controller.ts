import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  InternalServerErrorException,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { VisitorsService } from 'src/infra/services/visitors/customers.service';
import { UploadService } from 'src/infra/services/upload/upload.service';
import { RegisterDTO, CreateDTO } from './dto';
import { hashSync } from 'bcrypt-nodejs';
import { isEmpty } from 'class-validator';

@Controller('visitors')
export class VisitorsController {
  constructor(
    private visitorsService: VisitorsService,
    private uploadService: UploadService,
  ) {}

  @Post('/approval/:visitId')
  async preApproveVisit(@Param('visitId') visitId: string, @Query('approve') approve: string) {
    if(!await this.visitorsService.preApproveVisit(visitId, approve)) throw new BadRequestException('Nenhuma visita encontrada');
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file', maxCount: 1 },
        { name: 'files', maxCount: 10 },
      ]
    )
  )
  async create(
    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [
    //       new MaxFileSizeValidator({
    //         maxSize: 1000 * 1024 * 5,
    //         message: 'O arquivo deve ser menor do que 5Mb',
    //       }),
    //       // new FileTypeValidator({ fileType: 'image/*' }),
    //     ],
    //   }),
    // )
    // file: Express.Multer.File,
    @Body() body: any,
    @UploadedFiles() files: { 
      file?: Express.Multer.File[], 
      files?: Express.Multer.File[] 
    },
  ) {
    const found = await this.visitorsService.findByEmailOrIdentity(body);
    if (found) {
      throw new BadRequestException(
        `${found?.email == body.email ? 'E-mail' : found.identityType.toUpperCase()} já cadastrado`,
      );
    }
    body.birthday = new Date(body.birthday);
    body.password = hashSync(body.password);

    const result = await this.visitorsService.create(body);

    const { data, error, name, url } = await this.uploadService.uploadVisitorImageProfile(files.file[0], result.id);

    await this.visitorsService.updateUrl(result.id, url);

    await this.visitorsService.uploadDefaultFiles(files.files, result.id);
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('file'))
  async register(
    @Body() body: RegisterDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'O arquivo deve ser menor do que 5Mb',
          }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // const { data, error, name } = await this.uploadService.upload(file);

    // if (isEmpty(data) || error) {
    //   return new InternalServerErrorException(
    //     'Não foi possível fazer o upload do arquivo',
    //   );
    // }

    return name;
  }
}
