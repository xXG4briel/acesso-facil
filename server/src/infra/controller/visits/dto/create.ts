import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVisitDTO {
    @IsNotEmpty()
    @IsString()
    companyId: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    @IsDateString()
    scheduledDate: Date | string;

    @IsOptional()
    files: any[];
    @IsOptional()
    visitorId: string;

    constructor(data?: Partial<CreateVisitDTO>) {
        Object.assign(this, data)
    }
}