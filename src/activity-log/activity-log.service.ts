import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResourceNotFoundException } from '../common/exceptions';
import { Routine } from '../routine/entities/routine.entity';

import { ActivityLog } from './entities/activity-log.entity';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
    ) {}

    /** El registro pertenece al usuario autenticado (nunca viene del body). */
    async create(userId: number, dto: CreateActivityLogDto): Promise<ActivityLog> {
        if (!(await this.routineRepository.existsBy({ id: dto.routineId }))) {
            throw new ResourceNotFoundException('Rutina', dto.routineId);
        }
        const activityLog = this.activityLogRepository.create({ ...dto, userId });
        return await this.activityLogRepository.save(activityLog);
    }

    async findAll(): Promise<ActivityLog[]> {
        return await this.activityLogRepository.find({
            relations: { activityExercises: true },
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<ActivityLog> {
        const activityLog = await this.activityLogRepository.findOne({
            where: { id },
            relations: { activityExercises: true },
        });
        if (!activityLog) {
            throw new ResourceNotFoundException('Registro de actividad', id);
        }
        return activityLog;
    }

    async update(id: number, dto: UpdateActivityLogDto): Promise<ActivityLog> {
        await this.findOne(id);
        if (Object.keys(dto).length > 0) {
            await this.activityLogRepository.update(id, dto);
        }
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.activityLogRepository.delete(id);
    }
}
