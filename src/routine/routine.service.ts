import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResourceNotFoundException } from '../common/exceptions';

import { Routine } from './entities/routine.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
    ) {}

    /** El dueño de la rutina es siempre el usuario autenticado (nunca viene del body). */
    async create(userId: number, dto: CreateRoutineDto): Promise<Routine> {
        const routine = this.routineRepository.create({ ...dto, userId });
        return await this.routineRepository.save(routine);
    }

    async findAll(): Promise<Routine[]> {
        return await this.routineRepository.find({
            relations: { routineExercises: { exercise: true } },
            order: { id: 'ASC', routineExercises: { orderIndex: 'ASC' } },
        });
    }

    async findOne(id: number): Promise<Routine> {
        const routine = await this.routineRepository.findOne({
            where: { id },
            relations: { routineExercises: { exercise: true } },
            order: { routineExercises: { orderIndex: 'ASC' } },
        });
        if (!routine) {
            throw new ResourceNotFoundException('Rutina', id);
        }
        return routine;
    }

    async update(id: number, dto: UpdateRoutineDto): Promise<Routine> {
        await this.findOne(id);
        if (Object.keys(dto).length > 0) {
            await this.routineRepository.update(id, dto);
        }
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.routineRepository.delete(id);
    }
}
