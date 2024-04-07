import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
    try {
      const supabase = createClient(
        this.supabaseUrl,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhcXN6dnJ3emdpdnR4Y25wcWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0NTk2ODAsImV4cCI6MjAyODAzNTY4MH0._zwY6txQlZDS31rhqs5ewri3VzO9bbje3lJUv9tm7fc',
        {
          auth: {
            persistSession: false,
          },
        },
      );

      const ext = `${file.originalname}`.split('.')[1] || 'jpg';
      const name = `${randomUUID()}.${ext}`;

      this.logger.debug(name);

      const result = await supabase.storage
        .from('register')
        .upload(name, file.buffer, {
          upsert: true,
          contentType: file.mimetype,
        });
      return { ...result, name };
    } catch (err) {
      this.logger.error(err);
    }
  }
}
