import { Module } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { CompanysService } from './companys/companys.service';
import { VisitorsService } from './visitors/customers.service';
import { UploadService } from './upload/upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  providers: [
    CompanysService,
    VisitorsService,
    UploadService,
    ClientService,
    ConfigService,
  ],
  exports: [
    CompanysService,
    VisitorsService,
    UploadService,
    ClientService,
    ConfigService,
  ],
})
export class DatabaseModule {}
