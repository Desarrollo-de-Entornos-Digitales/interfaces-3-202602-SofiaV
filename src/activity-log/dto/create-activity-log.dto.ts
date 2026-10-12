import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, Min } from 'class-validator';

export class CreateActivityLogDto {
    @IsInt()
    @Min(1)
    routineId: number;

    @Type(() => Date)
    @IsDate({ message: 'startedAt debe ser una fecha válida (ISO 8601)' })
    startedAt: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'completedAt debe ser una fecha válida (ISO 8601)' })
    completedAt?: Date;
}
