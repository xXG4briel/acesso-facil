import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFileSync } from 'fs';
import { randomUUID } from 'crypto';

import { createClient } from '@supabase/supabase-js';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  private supabaseUrl: string;
  private supabaseKey: string;

  private storage: { url: string, bucket: string };

  constructor(
    private configService: ConfigService,
    private clientService: ClientService  
  ) {
    this.supabaseUrl = this.configService.getOrThrow('SUPABASE_URL');
    this.supabaseKey = this.configService.getOrThrow('SUPABASE_KEY');

    this.storage = {
      bucket: this.configService.getOrThrow('STORAGE_BUCKET'),
      url: this.configService.getOrThrow('STORAGE_URL')
    }

    this.logger.debug(`\nurl ${this.supabaseUrl}\nkey ${this.supabaseKey}`);
  }

  async uploadCompany(file: Express.Multer.File, visitId: string) {
    return await this.upload(file, 'documents', `Companies/${visitId}`);
  }

  async uploadVisitor(file: Express.Multer.File, visitId: string) {
    return await this.upload(file, 'documents', `visitors/${visitId}`);
  }

  async uploadVisit(file: Express.Multer.File, visitId: string) {
    return await this.upload(file, 'documents', `visits/${visitId}`);
  }

  async uploadAllCompany(file: Express.Multer.File[], visitId: string) {
    return await this.uploadAll(file, 'documents', `Companies/${visitId}`);
  }

  async uploadAllVisitor(files: Express.Multer.File[], visitId: string) {
    const data = await this.uploadAll(files, 'documents', `visitors/${visitId}`);

    await this.saveDocumentVisit(visitId, data);

    return data;
  } 

  async uploadAllVisit(file: Express.Multer.File[], visitId: string) {
    const data = await this.uploadAll(file, 'documents', `visits/${visitId}`);

    await this.saveDocumentVisit(visitId, data);

    return data;
  }

  async upload(file: Express.Multer.File, bucket: string, path: string): Promise<any> {
    // const buffer = Buffer.from(
    //   file.buffer.toString().replace(/^data:image\/png;base64,/, ''),
    //   'base64',
    // );
    const buffer = file.buffer;

    try {
      const supabase = this.getClient();

      const ext = `${file.originalname}`.split('.')[1] || 'png';
      let name = `${randomUUID()}.${ext}`;
      const fileName = file.originalname || name;
      if(path && path != '') {
        name = `${path}/${name}`
      }

      const url = `${this.storage.url}/${this.storage.bucket}/${name}`;

      const result = await supabase.storage
        .from(bucket)
        .upload(name, buffer, {
          upsert: true,
          contentType: file.mimetype,
      });
      
      this.logger.debug(JSON.stringify(result, null, 2))

      return { ...result, name: fileName, url };
    } catch (err) {
      this.logger.error(err);
    }
  }
  async uploadAll(files: Express.Multer.File[], bucket: string, path: string): Promise<any> {
    const data = []
    
    for(const file of files) {
      const buffer = file.buffer;
  
      try {
        const supabase = this.getClient();
  
        const ext = `${file.originalname}`.split('.')[1] || 'png';
        let name = `${randomUUID()}.${ext}`;
        const fileName = file.originalname || name;
        if(path && path != '') {
          name = `${path}/${name}`
        }

        const url = `${this.storage.url}/${this.storage.bucket}/${name}`;
  
        this.logger.debug(`url ${url}\nname ${name}`);
  
        const result = await supabase.storage
          .from(bucket)
          .upload(name, buffer, {
            upsert: true,
            contentType: file.mimetype,
          });

          const document = await this.clientService.document.create({ 
            data: {
              description: '',
              name: fileName,
              url,
              createdAt: new Date(),
            }
          });

        data.push({ ...result, name: fileName, url, documentId: document.id });
      } catch (err) {
        this.logger.error(err);
      }
    }

    return data;
  }

  private getClient() {
    return createClient(this.supabaseUrl, this.supabaseKey, {
      auth: {
        persistSession: false,
      }}
    );
  }

  private async saveDocumentVisit(visitId: string, data: any) {
    const visit = await this.clientService.visit.findFirst({ where: { id: visitId } });
    if (visit) {
      const { companyId, visitorId } = visit;

      await this.clientService.documentVisit.createMany({
        data: data.map((file: any) => ({
          documentId: file.documentId,
          visitId,
          visitorId,
          createdAt: new Date(),
        }))
      });
    }
  }
}
