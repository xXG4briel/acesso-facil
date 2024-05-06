import { Injectable, Logger } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class VisitsService {
  readonly logger = new Logger(VisitsService.name);

  constructor(private readonly clientService: ClientService) {}

  async findAllCompanys(companyId: string) {
    try {
      const [waiting, approved, rejected, finished] = await Promise.all([
        this.clientService.visit.findMany({
          where: { companyId, approved: null },
          include: { visitor: { select: { fullName: true, url: true, role: true, phone: true }} },
          orderBy: [ { scheduledDate: 'asc' } ]
        }),
        this.clientService.visit.findMany({ 
          where: { companyId, approved: { equals: true } }, 
          include: { visitor: { select: { fullName: true, url: true, role: true, phone: true }} },
          orderBy: [ { scheduledDate: 'asc' } ]
        }),
        this.clientService.visit.findMany({ 
          where: { companyId, approved: { equals: false } }, 
          include: { visitor: { select: { fullName: true, url: true, role: true, phone: true }} },
          orderBy: [ { scheduledDate: 'asc' } ]
        }),
        this.clientService.visit.findMany({ 
          where: { companyId, finished: { equals: true } },          
          include: { visitor: { select: { fullName: true, url: true, role: true, phone: true }} },
          orderBy: [ { scheduledDate: 'asc' } ]
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
          include: { company: { select: { name: true, url: true, address: true }} },
          orderBy: [ { scheduledDate: 'asc' } ]
        }),
        this.clientService.visit.findMany({ 
          where: { visitorId, approved: { equals: true } }, 
          include: { company: { select: { name: true, url: true, address: true }} },
          orderBy: [ { scheduledDate: 'asc' } ]
        }),
        this.clientService.visit.findMany({ 
          where: { visitorId, approved: { equals: false } }, 
          include: { company: { select: { name: true, url: true, address: true }} },
          orderBy: [ { scheduledDate: 'asc' } ]
        }),
        this.clientService.visit.findMany({ 
          where: { visitorId, finished: { equals: true } },          
          include: { company: { select: { name: true, url: true, address: true }} },
          orderBy: [ { scheduledDate: 'asc' } ]
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
      return this.clientService.visit.update({ data: { ...data }, where: { id } });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
