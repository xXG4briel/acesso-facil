import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientService } from 'src/client/client.service';
import { EmailService } from 'src/infra/common';

@Injectable()
export class CompanysService {
  private readonly logger = new Logger(CompanysService.name);
  private readonly webUrl: string;

  constructor(
    private readonly clientService: ClientService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService
  ) {
    this.webUrl = configService.getOrThrow('WEB_URL');
  }

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

  formatDate = (d) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  async createVisit(data, companyId: string) {
    const visitor = await this.clientService.visitor.findFirst({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    const company = await this.clientService.company.findFirst({ where: { id: companyId } })

    if (!visitor) return { success: false, message: 'Visitante não encontrado.' };

    const visit = await this.clientService.visit.create({
      data: {
        companyId: companyId,
        visitorId: visitor.id,
        description: data.description,
        files: [],
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate)
      }
    });

    const dataEmail = { 
      companyWebsiteUrl: `${this.webUrl}/visitors/approval/${visit.id}?approve=y`, 
      companyName: company.name, 
      qrcode: '', 
      username: visitor.fullName.trim(), 
      startDate: this.formatDate(new Date(data.startDate)), 
      endDate: this.formatDate(new Date(data.endDate)) 
    };

    await this.emailService.sendTemplateEmail(visitor.email, 'Visita criada', 'visit-created', dataEmail);

    this.logger.log(`create visit with success Id ${visit.id}, visit ${visitor.id} ${visitor.fullName}, company ${companyId}`);

    const documentsDefault = await this.clientService.document.findMany({
      where: {
        visitorId: visitor.id,
        default: true
      },
      select: {
        id: true,
      }
    });

    this.logger.log(`documents default ${documentsDefault.map(document => document.id)}`);

    const documentVisit = await this.clientService.documentVisit.createMany({
      data: documentsDefault.map(document => ({
        documentId: document.id,
        visitId: visit.id,
        visitorId: visitor.id
      }))
    });

    this.logger.log(`create document visit with success Id ${documentVisit.count}, visit ${visit.id} ${visitor.id} ${visitor.fullName}, company ${companyId}`);

    return { success: true, message: '' };
  }

  async updateVisit(id: string, data, companyId: string) {
    const visit = await this.clientService.visit.findFirst({
      where: {
        id,
        companyId,
      },
    });

    if (!visit) return { success: false, message: 'Visita não encontrada.' };

    const update = await this.clientService.visit.update({
      where: {
        id,
      },
      data: {
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      }
    });

    this.logger.log(`update visit with success Id ${visit.id}, company ${companyId}`);

    return { success: true, message: '' };
  }
}
