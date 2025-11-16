import { Controller, FileTypeValidator, Get, Logger, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { EmailService, QrCodeService } from 'src/infra/common';
import { UploadService } from 'src/infra/services/upload/upload.service';

@Controller('test')
export class TestController {
  private readonly logger = new Logger(TestController.name)

  readonly emailSettings = {
    true: {
      subject: 'Visita Aprovada',
      template: 'visit-approved'
    },
    false: {
      subject: 'Visita Rejeitada',
      template: 'visit-reject'
    }
  }
  webUrl: string;

  constructor(
    private readonly emailService: EmailService,
    private readonly qrCodeService: QrCodeService,
    private readonly configService: ConfigService,
    private readonly uploadService: UploadService
    ) {
      this.webUrl = this.configService.getOrThrow('WEB_URL');
    }

    formatDate = (d) => {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // meses começam em 0
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
      
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    @Put(':id')
    async sendEmail(@Param('id') id: string) {
        let to = 'acesso.facil.contato@outlook.com';
        let username = 'Ayrton Senna';

        const { subject, template } = this.emailSettings[String(id != '0')];
        let startDate = this.formatDate(new Date(2025, 10, 17, 18));
        let endDate = this.formatDate(new Date(2025, 10, 18, 21, 30));

        if (id != '0') {
            const qrcode = await this.qrCodeService.generate(id);
            const attachments = [
              {
                filename: "qrcode.png",
                content: qrcode.replace(/^data:image\/\w+;base64,/, ''),
                encoding: "base64",
              }
            ]
            await this.emailService.sendTemplateEmail(to, subject, template, { qrcode, username, startDate, endDate }, attachments);
        }
        else {
            await this.emailService.sendTemplateEmail(to, subject, template, { companyName: 'Petrobras', username, startDate, endDate });
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({
              maxSize: 1000 * 1024 * 5,
              message: 'O arquivo deve ser menor do que 5Mb',
            }),
          ],
        }),
      )
      file: Express.Multer.File
    ) {
      await this.uploadService.upload(file, 'documents', 'visita');
    }

    @Post('upload-all')
    @UseInterceptors(FilesInterceptor('file'))
    async uploadAll(
      @UploadedFiles() files: Express.Multer.File[]
    ) {
      await this.uploadService.uploadAllVisit(files, '2990b923-987e-4d51-98bc-08c1b3f2f8d9');
    }
}
