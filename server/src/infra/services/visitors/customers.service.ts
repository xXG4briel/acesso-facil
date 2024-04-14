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

      this.logger.debug(
        `register 'with success\n${JSON.stringify(data, null, 2)}`,
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  }
}
