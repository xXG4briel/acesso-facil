import { Injectable, Logger } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class CompanysService {
  private readonly logger = new Logger(CompanysService.name);

  constructor(private clientService: ClientService) {}

  async findByEmailOrIdentity(data) {
    return await this.clientService.company.findFirst({
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
      const result = await this.clientService.company.create({
        data,
      });

      this.logger.log(
        `register with success\n${JSON.stringify(result, null, 2)}`,
      );

      return result;
    } catch (err) {
      console.error(err);
    }
  }

  async findAll() {
    return await this.clientService.company.findMany();
  }
}
