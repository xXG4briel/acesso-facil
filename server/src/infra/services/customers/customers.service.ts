import { Injectable, Logger } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(private clientService: ClientService) {}

  async findByEmailOrIdentity(data) {
    return await this.clientService.customer.findFirst({
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
      const result = await this.clientService.customer.create({
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
