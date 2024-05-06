import { IsBoolean, IsOptional } from "class-validator";

export class UpdateVisitDTO {
    @IsOptional()
    scheduledDate: string | Date;
    @IsOptional()
    @IsBoolean()
    finished: boolean;
    @IsOptional()
    @IsBoolean()
    approved: boolean;

    constructor(data?: Partial<UpdateVisitDTO>) {
        Object.assign(this, data)
    }
}