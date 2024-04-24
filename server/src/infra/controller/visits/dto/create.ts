import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateVisitDTO {
    @IsNotEmpty()
    @IsString()
    companyId: string;
    @IsNotEmpty()
    @IsDateString()
    scheduledDate: string;

    constructor(data?: Partial<CreateVisitDTO>) {
        Object.assign(this, data)
    }
}