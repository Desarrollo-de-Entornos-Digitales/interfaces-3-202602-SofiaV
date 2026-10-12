import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResourceNotFoundException } from '../common/exceptions';

import { Exercise } from './entities/exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    async create(dto: CreateExerciseDto): Promise<Exercise> {
        const exercise = this.exerciseRepository.create(dto);
        return await this.exerciseRepository.save(exercise);
    }

    async findAll(): Promise<Exercise[]> {
        return await this.exerciseRepository.find({ order: { id: 'ASC' } });
    }

    async findOne(id: number): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOneBy({ id });
        if (!exercise) {
            throw new ResourceNotFoundException('Ejercicio', id);
        }
        return exercise;
    }

    async update(id: number, dto: UpdateExerciseDto): Promise<Exercise> {
        await this.findOne(id);
        if (Object.keys(dto).length > 0) {
            await this.exerciseRepository.update(id, dto);
        }
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.exerciseRepository.delete(id);
    }
}
