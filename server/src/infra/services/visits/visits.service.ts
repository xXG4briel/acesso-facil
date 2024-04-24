import { Injectable, Logger } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class VisitsService {
  readonly logger = new Logger(VisitsService.name);

  constructor(private readonly clientService: ClientService) {}

  async findAll(companyId: string) {
    try {
      const [waiting, approved, rejected, finished] = await Promise.all([
        this.clientService.visit.findMany({
          where: { companyId, approved: null },
        }),
        this.clientService.visit.findMany({ where: { companyId, approved: { equals: true } } }),
        this.clientService.visit.findMany({ where: { companyId, approved: { equals: false } } }),
        this.clientService.visit.findMany({ where: { companyId, finished: { equals: true } } }),
      ]);

      return { waiting, approved, rejected, finished };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async find(id: string) {
    try {
      return this.clientService.visit.findFirst({ where: { id } });
    } catch (err) {
      this.logger.error(err);
    }
  }

  async create(data) {
    try {
      return this.clientService.visit.create({ data: {
        scheduledDate: new Date(),
        visitorId: 'bbb0b44c-9c00-4a30-9186-87e0a9449dc8',
        files: ['1', '2', '3'],
        companyId: '9b86dc39-84c6-48f0-b48a-abec0a047f4b'
      } });
    } catch (err) {
      this.logger.error(err);
    }
  }
  
  async update(id, data) {
    try {
      return this.clientService.visit.update({ data: { ...data }, where: { id } });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
