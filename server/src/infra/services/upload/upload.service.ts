import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFileSync } from 'fs';
import { randomUUID } from 'crypto';

import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  private supabaseUrl: string;
  private supabaseKey: string;

  constructor(private configService: ConfigService) {
    this.supabaseUrl = this.configService.getOrThrow('SUPABASE_URL');
    this.supabaseKey = this.configService.getOrThrow('SUPABASE_KEY');

    this.logger.debug(`\nurl ${this.supabaseUrl}\nkey ${this.supabaseKey}`);
  }

  async upload(file: Express.Multer.File) {
    const buffer = Buffer.from(
      file.buffer.toString().replace(/^data:image\/png;base64,/, ''),
      'base64',
    );

    try {
      const supabase = this.getClient();

      const ext = `${file.originalname}`.split('.')[1] || 'png';
      const name = `${randomUUID()}.${ext}`;

      this.logger.debug(name);

      const result = await supabase.storage
        .from('register')
        .upload(name, buffer, {
          upsert: true,
          contentType: file.mimetype,
        });
      return { ...result, name };
    } catch (err) {
      this.logger.error(err);
    }
  }
  async uploadAll(file: Express.Multer.File) {
    const buffer = Buffer.from(
      file.buffer.toString().split(',')[1],
    );

    try {
      const supabase = this.getClient();

      const ext = `${file.originalname}`.split('.')[1] || 'png';
      const name = `${randomUUID()}.${ext}`;

      this.logger.debug(name);

      const result = await supabase.storage
        .from('register')
        .upload(name, buffer, {
          upsert: true,
          contentType: file.mimetype,
        });
      return { ...result, name };
    } catch (err) {
      this.logger.error(err);
    }
  }

  private getClient() {
    return createClient(this.supabaseUrl, this.supabaseKey, {
      auth: {
        persistSession: false,
      }}
    );
  }
}
