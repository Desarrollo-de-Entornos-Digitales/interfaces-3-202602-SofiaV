import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResourceNotFoundException } from '../common/exceptions';
import { Routine } from '../routine/entities/routine.entity';
import { Exercise } from '../exercise/entities/exercise.entity';

import { RoutineExercise } from './entities/routine-exercise.entity';
import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';

@Injectable()
export class RoutineExerciseService {
    constructor(
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    async create(dto: CreateRoutineExerciseDto): Promise<RoutineExercise> {
        if (!(await this.routineRepository.existsBy({ id: dto.routineId }))) {
            throw new ResourceNotFoundException('Rutina', dto.routineId);
        }
        if (!(await this.exerciseRepository.existsBy({ id: dto.exerciseId }))) {
            throw new ResourceNotFoundException('Ejercicio', dto.exerciseId);
        }
        const routineExercise = this.routineExerciseRepository.create(dto);
        return await this.routineExerciseRepository.save(routineExercise);
    }

    async findAll(): Promise<RoutineExercise[]> {
        return await this.routineExerciseRepository.find({
            relations: { exercise: true },
            order: { routineId: 'ASC', orderIndex: 'ASC' },
        });
    }

    async findOne(id: number): Promise<RoutineExercise> {
        const routineExercise = await this.routineExerciseRepository.findOne({
            where: { id },
            relations: { exercise: true },
        });
        if (!routineExercise) {
            throw new ResourceNotFoundException('Ejercicio de rutina', id);
        }
        return routineExercise;
    }

    async update(id: number, dto: UpdateRoutineExerciseDto): Promise<RoutineExercise> {
        await this.findOne(id);
        if (Object.keys(dto).length > 0) {
            await this.routineExerciseRepository.update(id, dto);
        }
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.routineExerciseRepository.delete(id);
    }
}
