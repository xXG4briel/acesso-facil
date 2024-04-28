import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/services';
import { CompanysController } from './infra/controller/companys/controller';
import { VisitorsController } from './infra/controller/visitors/controller';
import { AuthController } from './infra/controller/auth/controller';
import { JwtModule } from '@nestjs/jwt';
import { VisitsController } from './infra/controller/visits/visits.controller';
import { VisitsService } from './infra/services/visits/visits.service';
import { AuthMiddleware } from './middleware';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: '%/*G3cPX01-k`hzB%-OA9:}vgo)9Jtzq',
      signOptions: { expiresIn: '1day' },
    }),
  ],
  controllers: [
    AppController,
    CompanysController,
    VisitorsController,
    AuthController,
    VisitsController,
  ],
  providers: [AppService, VisitsService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
