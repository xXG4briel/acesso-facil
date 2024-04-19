import { Module } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { CompanysService } from './companys/companys.service';
import { VisitorsService } from './visitors/customers.service';
import { UploadService } from './upload/upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VisitsService } from './visits/visits.service';
@Module({
  imports: [ConfigModule],
  providers: [
    CompanysService,
    VisitorsService,
    UploadService,
    ClientService,
    ConfigService,
    VisitsService,
  ],
  exports: [
    CompanysService,
    VisitorsService,
    UploadService,
    ClientService,
    ConfigService,
    VisitsService,
  ],
})
export class DatabaseModule {}
