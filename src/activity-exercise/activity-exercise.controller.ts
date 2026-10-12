import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PERMISSIONS } from '../auth/constants/permissions.constants';

import { ActivityExerciseService } from './activity-exercise.service';
import { CreateActivityExerciseDto } from './dto/create-activity-exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity-exercise.dto';

@Controller('activity-exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ActivityExerciseController {
    constructor(private readonly activityExerciseService: ActivityExerciseService) {}

    @Post()
    @Permissions(PERMISSIONS.CREATE_ROUTINE)
    create(@Body() dto: CreateActivityExerciseDto) {
        return this.activityExerciseService.create(dto);
    }

    @Get()
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findAll() {
        return this.activityExerciseService.findAll();
    }

    @Get(':id')
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.activityExerciseService.findOne(id);
    }

    @Patch(':id')
    @Permissions(PERMISSIONS.UPDATE_ROUTINE)
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateActivityExerciseDto) {
        return this.activityExerciseService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(PERMISSIONS.DELETE_ROUTINE)
    async remove(@Param('id', PositiveIntPipe) id: number) {
        await this.activityExerciseService.remove(id);
    }
}
