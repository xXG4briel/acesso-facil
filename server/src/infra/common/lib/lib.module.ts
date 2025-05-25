import { Module } from "@nestjs/common";
import { EmailService } from "./email/email.service";
import { QrCodeService } from "./qr-code/qr-code.service";

@Module({
    imports: [],
    controllers: [],
    providers: [EmailService, QrCodeService],
    exports: [EmailService, QrCodeService],
})
export class LibModule {}