import { Injectable, Logger } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class VisitorsService {
  private readonly logger = new Logger(VisitorsService.name);

  constructor(private clientService: ClientService) {}

  async findByEmailOrIdentity(data) {
    return await this.clientService.visitor.findFirst({
      where: {
        OR: [
          { email: { equals: data.email } },
          { identity: { equals: data.identity } },
        ],
      },
    });
  }

  async create(data) {
    try {
      const result = await this.clientService.visitor.create({
        data,
      });

      this.logger.log(
        `register with success\n${JSON.stringify(data, null, 2)}`,
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  }

  async preApproveVisit(visitId: string, approve: string) {
    const isApprove = /y/.test(approve.toLowerCase().trim())

    const visit = await this.clientService.visit.findFirst({ where: { id: visitId, visitorAccepted: null } });
    if(visit) {
      visit.visitorAccepted = isApprove;
      await this.clientService.visit.update({ data: visit, where: { id: visit.id } });
      return visit;
    }
    else {
      return null;
    }
  }
}
