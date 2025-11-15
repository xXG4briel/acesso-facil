import { Injectable, Logger } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class VisitorsService {
  private readonly logger = new Logger(VisitorsService.name);

  constructor(private clientService: ClientService, private readonly uploadService: UploadService) {}

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

  async updateUrl(id, url) {
    try {
      const result = await this.clientService.visitor.update({
        data: { url },
        where: { id }
      });

      this.logger.log(
        `update with success`,
      );

      return result;
    } catch (err) {
      this.logger.error(
        `update with success`, err
      );
    }
  }

  private async saveDocumentDefaultVisitor(visitorId: string, data: any) {
    for(let d of data) {
      await this.clientService.document.update({ 
        where: {
          id: d.documentId
        },
        data: {
          default: true,
          visitorId,
          description: `Arquivo padrão - ${d.name} `,
        }
    })
    }
    // await this.clientService.document.createMany({
    //   data: data.map((file: any) => ({
    //     documentId: file.documentId,
    //     visitorId,
    //     name: file.name,
    //     url: file.url,
    //     description: `Arquivo padrão - ${file.name} `,
    //     createdAt: new Date(),
    //     default: true
    //   }))
    // });
  }

  async uploadDefaultFiles(files: Express.Multer.File[], visitorId: string) {
    const data = await this.uploadService.uploadAll(files, 'documents', `visitors/${visitorId}`);

    await this.saveDocumentDefaultVisitor(visitorId, data);

    return data;
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
