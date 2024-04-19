import { Injectable, Logger } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class VisitsService {
  readonly logger = new Logger(VisitsService.name);

  constructor(private readonly clientService: ClientService) {}

  async findAll() {
    try {
      const [waiting, approved, rejected, finished] = await Promise.all([
        this.clientService.visit.findMany({
          where: { approved: null, rejected: null },
        }),
        this.clientService.visit.findMany({ where: { approved: { equals: true } } }),
        this.clientService.visit.findMany({ where: { rejected: { equals: true } } }),
        this.clientService.visit.findMany({ where: { finished: { equals: true } } }),
      ]);

      return { waiting, approved, rejected, finished };
    } catch (err) {
      this.logger.error(err);
    }
  }
}
