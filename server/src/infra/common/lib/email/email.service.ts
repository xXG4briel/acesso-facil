
import { Injectable, Logger } from '@nestjs/common';
import { template } from 'lodash';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import * as nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private from = null;
  private transporter: nodemailer.Transporter;
  private mailerSend: MailerSend;
  private emailDefault = {
    logoUrl: 'https://acesso-facil-sigma.vercel.app//assets/images/logo.png',
    year: new Date().getFullYear(),
    companyName: 'Acesso Facil',
    url: 'https://acesso-facil-sigma.vercel.app/',
  }

  constructor() {
    this.from = new Sender(process.env.SMTP_USER, process.env.SMTP_FROM);
    // this.mailerSend = new MailerSend({
    //   apiKey: process.env.SENDGRID_TOKEN,
    // });
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      /*
      const emailParams = new EmailParams()
      .setFrom(this.from)
      .setTo([ new Recipient(to) ])
      .setSubject(subject)
      .setHtml(html);

      await this.mailerSend.email.send(emailParams);*/
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        html,
      });
     
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendTemplateEmail(
      to: string,
      subject: string,
      template: string,
      data: any
  ): Promise<void> {
    try {
      const html = await this.getTemplate(template, {...data, ...this.emailDefault});

      await this.sendEmail(to, subject, html);
      this.logger.debug(`Email sent to ${to} with subject "${subject}"`);
    } 
    catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
    }
  }
  async getTemplate(templateName: string, data: any) {  
    const templateContent = await readFile(`${process.cwd()}/src/infra/common/lib/email/templates/${templateName}.html`, 'utf8');
    const compiled = template(templateContent);
    return compiled(data);
  }
}