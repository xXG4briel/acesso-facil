import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/services';
import { CompanysController } from './infra/controller/companys/controller';
import { VisitorsController } from './infra/controller/visitors/controller';
import { AuthController } from './infra/controller/auth/controller';
import { JwtModule } from '@nestjs/jwt';
import { VisitsController } from './infra/controller/visits/visits.controller';
import { AuthMiddleware } from './middleware';
import { TestController } from './infra/controller/test/test.controller';
import { LibModule } from './infra/common';

@Module({
  imports: [
    DatabaseModule,
    LibModule,
    JwtModule.register({
      global: true,
      secret: '%/*G3cPX01-k`hzB%-OA9:}vgo)9Jtzq',
      signOptions: { expiresIn: '1day' },
    })    
  ],
  controllers: [
    AppController,
    CompanysController,
    VisitorsController,
    AuthController,
    VisitsController,
    TestController
  ],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude(
      { path: 'visitors/approval/(.*)', method: RequestMethod.ALL },
      { path: 'companys', method: RequestMethod.POST },
      { path: 'visitors', method: RequestMethod.POST },
      { path: 'test/(.*)', method: RequestMethod.ALL },
    )
    .forRoutes('*')
  }
}
