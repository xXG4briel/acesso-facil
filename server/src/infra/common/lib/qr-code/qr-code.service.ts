import { Injectable, Logger } from "@nestjs/common";
import * as qrcode from 'qrcode'

@Injectable()
export class QrCodeService {

    private readonly logger = new Logger(QrCodeService.name);

    constructor() {}

    async generate(data: string) {
        try {
            const result = await qrcode.toDataURL(data);
            return result;            
        } catch (error) {
            this.logger.error('Error to generate qrcode ' + error.message)
        }
    }
}