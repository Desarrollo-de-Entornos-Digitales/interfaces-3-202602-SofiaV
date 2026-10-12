import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoutineDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre de la rutina es obligatorio' })
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}
