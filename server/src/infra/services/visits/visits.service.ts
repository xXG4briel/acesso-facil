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
      subject: 'Visita Rejeitada',
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

  formatDate = (d) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  async update(id, data) {
    try {
      
      const result = await this.clientService.visit.update({ data: { ...data }, where: { id } });
      const { startDate, endDate, visitorId, companyId } = result;

      const company = await this.clientService.company.findFirst({ where: { id: companyId } });

      if(data.approved != null) {
        this.logger.debug(`send email to visitor ${data.approved ? 'approved' : 'rejected'} visit`)

        const visitor = await this.clientService.visitor.findUnique({ 
          where: { id: visitorId }, 
          select: { id: true, email: true, fullName: true } 
        });
        const to = visitor.email;
        const { subject, template } = this.emailSettings[data.approved];
        let username = visitor.fullName;

        this.logger.debug(`visitor ${to} ${visitor.id}, subject ${subject}, template ${template} `)

        const emailData = {
          qrcode: '',
          username,
          companyName: company.name,
          startDate: this.formatDate(startDate), 
          endDate: this.formatDate(endDate)
        }

        if (data.approved) {
          const qrcode = await this.qrCodeService.generate(id);
          const attachments = [
            {
              filename: "qrcode.png",
              content: qrcode.replace(/^data:image\/\w+;base64,/, ''),
              encoding: "base64",
            }
          ]
          await this.emailService.sendTemplateEmail(to, subject, template, { ...emailData, qrcode }, attachments);
        }
        else if (data.approved == false) {
          await this.emailService.sendTemplateEmail(to, subject, template, { ...emailData });
        }
      }


      return result;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
