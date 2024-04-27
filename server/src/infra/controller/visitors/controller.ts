import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  InternalServerErrorException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
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
    // const found = await this.visitorsService.findByEmailOrIdentity(body);
    // if (found) {
    //   throw new BadRequestException(
    //     `${found?.email == body.email ? 'E-mail' : found.identityType.toUpperCase()} já cadastrado`,
    //   );
    // }
    // body.birthday = new Date(body.birthday);
    // body.password = hashSync(body.password);

    const { data, error, name, url } = await this.uploadService.upload(file);

    // const result = await this.visitorsService.create(body);

    // if (isEmpty(data) || error) {
    //   return new InternalServerErrorException(
    //     'Não foi possível fazer o upload da sua imagem',
    //   );
    // }

    // if (!result) {
    //   throw new InternalServerErrorException(
    //     'Não foi possível fazer o registro',
    //   );
    // }

    // return result;
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
    const { data, error, name } = await this.uploadService.upload(file);

    if (isEmpty(data) || error) {
      return new InternalServerErrorException(
        'Não foi possível fazer o upload do arquivo',
      );
    }

    return name;
  }
}
