import { Module } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { CompanysService } from './companys/companys.service';
import { CustomersService } from './customers/customers.service';
import { UploadService } from './upload/upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  providers: [
    CompanysService,
    CustomersService,
    UploadService,
    ClientService,
    ConfigService,
  ],
  exports: [
    CompanysService,
    CustomersService,
    UploadService,
    ClientService,
    ConfigService,
  ],
})
export class DatabaseModule {}
