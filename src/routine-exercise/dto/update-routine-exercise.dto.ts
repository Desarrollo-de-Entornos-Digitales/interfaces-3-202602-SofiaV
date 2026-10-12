import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateRoutineExerciseDto } from './create-routine-exercise.dto';

// La rutina y el ejercicio de una fila no se reasignan: se elimina y se crea otra.
export class UpdateRoutineExerciseDto extends PartialType(
    OmitType(CreateRoutineExerciseDto, ['routineId', 'exerciseId'] as const),
) {}
