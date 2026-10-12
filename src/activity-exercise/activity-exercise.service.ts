import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResourceNotFoundException } from '../common/exceptions';
import { ActivityLog } from '../activity-log/entities/activity-log.entity';
import { RoutineExercise } from '../routine-exercise/entities/routine-exercise.entity';

import { ActivityExercise } from './entities/activity-exercise.entity';
import { CreateActivityExerciseDto } from './dto/create-activity-exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity-exercise.dto';

@Injectable()
export class ActivityExerciseService {
    constructor(
        @InjectRepository(ActivityExercise)
        private readonly activityExerciseRepository: Repository<ActivityExercise>,
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
    ) {}

    async create(dto: CreateActivityExerciseDto): Promise<ActivityExercise> {
        if (!(await this.activityLogRepository.existsBy({ id: dto.activityLogId }))) {
            throw new ResourceNotFoundException('Registro de actividad', dto.activityLogId);
        }
        if (!(await this.routineExerciseRepository.existsBy({ id: dto.routineExerciseId }))) {
            throw new ResourceNotFoundException('Ejercicio de rutina', dto.routineExerciseId);
        }
        const activityExercise = this.activityExerciseRepository.create(dto);
        return await this.activityExerciseRepository.save(activityExercise);
    }

    async findAll(): Promise<ActivityExercise[]> {
        return await this.activityExerciseRepository.find({ order: { id: 'ASC' } });
    }

    async findOne(id: number): Promise<ActivityExercise> {
        const activityExercise = await this.activityExerciseRepository.findOneBy({ id });
        if (!activityExercise) {
            throw new ResourceNotFoundException('Ejercicio de actividad', id);
        }
        return activityExercise;
    }

    async update(id: number, dto: UpdateActivityExerciseDto): Promise<ActivityExercise> {
        await this.findOne(id);
        if (Object.keys(dto).length > 0) {
            await this.activityExerciseRepository.update(id, dto);
        }
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.activityExerciseRepository.delete(id);
    }
}
