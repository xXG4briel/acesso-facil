import { Injectable, Logger } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { EmailService, QrCodeService } from 'src/infra/common';

@Injectable()
export class VisitsService {
  readonly logger = new Logger(VisitsService.name);
  readonly emailSettings = {
    true: {
      subject: 'Visita Aprovada',
      template: 'visit-approved'
    },
    false: {
      subject: 'Visita Aprovada',
      template: 'visit-reject'
    }
  }

  constructor(private readonly clientService: ClientService,
    private readonly emailService: EmailService,
    private readonly qrCodeService: QrCodeService
  ) { }

  async findAllCompanys(companyId: string) {
    try {
      const [waiting, approved, rejected, finished] = await Promise.all([
        this.clientService.visit.findMany({
          where: { companyId, approved: null },
          include: { visitor: { select: { fullName: true, url: true, role: true, phone: true } }, documentVisit: { include: { document: { select: { name: true, url: true } } } } },
          orderBy: [{ createdAt: 'asc' }]
        }),
        this.clientService.visit.findMany({
          where: { companyId, approved: { equals: true } },
          include: { visitor: { select: { fullName: true, url: true, role: true, phone: true } }, documentVisit: { include: { document: { select: { name: true, url: true } } } } },
          orderBy: [{ createdAt: 'asc' }]
        }),
        this.clientService.visit.findMany({
          where: { companyId, approved: { equals: false } },
          include: { visitor: { select: { fullName: true, url: true, role: true, phone: true } }, documentVisit: { include: { document: { select: { name: true, url: true } } } } },
          orderBy: [{ createdAt: 'asc' }]
        }),
        this.clientService.visit.findMany({
          where: { companyId, finished: { equals: true } },
          include: { visitor: { select: { fullName: true, url: true, role: true, phone: true } }, documentVisit: { include: { document: { select: { name: true, url: true } } } } },
          orderBy: [{ createdAt: 'asc' }]
        }),
      ]);

      return { waiting, approved, rejected, finished };
    } catch (err) {
      this.logger.error(err);
    }
  }
  async findAllVisitors(visitorId: string) {
    try {
      const [waiting, approved, rejected, finished] = await Promise.all([
        this.clientService.visit.findMany({
          where: { visitorId, approved: null },
          include: { company: { select: { name: true, url: true, address: true } } },
          orderBy: [{ createdAt: 'asc' }]
        }),
        this.clientService.visit.findMany({
          where: { visitorId, approved: { equals: true } },
          include: { company: { select: { name: true, url: true, address: true } } },
          orderBy: [{ createdAt: 'asc' }]
        }),
        this.clientService.visit.findMany({
          where: { visitorId, approved: { equals: false } },
          include: { company: { select: { name: true, url: true, address: true } } },
          orderBy: [{ createdAt: 'asc' }]
        }),
        this.clientService.visit.findMany({
          where: { visitorId, finished: { equals: true } },
          include: { company: { select: { name: true, url: true, address: true } } },
          orderBy: [{ createdAt: 'asc' }]
        }),
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
      return this.clientService.visit.create({ data });
    } catch (err) {
      this.logger.error(err);
    }
  }

  async update(id, data) {
    try {

      
      const result = await this.clientService.visit.update({ data: { ...data }, where: { id } });
      const { startDate, endDate, visitorId } = result;

      if(data.approved != null) {
        this.logger.debug(`send email to visitor ${data.approved ? 'approved' : 'rejected'} visit`)

        const visitor = await this.clientService.visitor.findUnique({ 
          where: { id: visitorId }, 
          select: { id: true, email: true, fullName: true } 
        });
        const to = visitor.email;
        const { subject, template, fullName: username } = this.emailSettings[data.approved];
  
        this.logger.debug(`visitor ${to} ${visitor.id}, subject ${subject}, template ${template} `)

        if (data.approved) {
          const qrcode = this.qrCodeService.generate(id);
          await this.emailService.sendTemplateEmail(to, subject, template, { qrcode, username, startDate, endDate });
        }
        else if (data.approved == false) {
          await this.emailService.sendTemplateEmail(to, subject, template, { username, startDate, endDate });
        }
      }


      return result;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
