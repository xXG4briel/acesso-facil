import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientService } from './client/client.service';
import { DatabaseModule } from './infra/services';
import { CompanysService } from './infra/services/companys/companys.service';
import { CustomersService } from './infra/services/customers/customers.service';
import { CompanysController } from './infra/controller/companys/companys.controller';
import { CustomersController } from './infra/controller/customers/customers.controller';
import { UploadService } from './infra/services/upload/upload.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, CompanysController, CustomersController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
