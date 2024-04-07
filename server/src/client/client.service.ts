import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClientService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'error'],
    });
  }

  onModuleDestroy() {
    this.$connect();
  }
  onModuleInit() {
    this.$disconnect();
  }
}
