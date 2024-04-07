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
import { CustomersService } from 'src/infra/services/customers/customers.service';
import { UploadService } from 'src/infra/services/upload/upload.service';
import { RegisterDTO, CreateDTO } from './dto';
import { get } from 'lodash';
import { isEmpty } from 'class-validator';

@Controller('customers')
export class CustomersController {
  constructor(
    private customersService: CustomersService,
    private uploadService: UploadService,
  ) {}

  @Post()
  async create(@Body() body: CreateDTO) {
    const found = await this.customersService.findByEmailOrIdentity(body);
    if (found) {
      throw new BadRequestException(
        `${found?.email == body.email ? 'E-mail' : found.identityType.toUpperCase()} já cadastrado`,
      );
    }

    const result = await this.customersService.create(body);

    if (!result) {
      throw new InternalServerErrorException(
        'Não foi possível fazer o registro',
      );
    }

    return result;
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
