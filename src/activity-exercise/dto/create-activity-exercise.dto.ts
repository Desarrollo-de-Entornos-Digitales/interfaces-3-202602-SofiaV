import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateActivityExerciseDto {
    @IsInt()
    @Min(1)
    activityLogId: number;

    @IsInt()
    @Min(1)
    routineExerciseId: number;

    @IsInt()
    @Min(0)
    actualSets: number;

    @IsInt()
    @Min(0)
    actualReps: number;

    @IsNumber()
    @Min(0)
    actualWeightKg: number;

    @IsInt()
    @Min(0)
    actualDurationMin: number;

    @IsNumber()
    @Min(0)
    caloriesBurned: number;

    @IsNumber()
    @Min(0)
    distanceCoveredKm: number;

    @Type(() => Date)
    @IsDate({ message: 'startedAt debe ser una fecha válida (ISO 8601)' })
    startedAt: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'completedAt debe ser una fecha válida (ISO 8601)' })
    completedAt?: Date;
}
