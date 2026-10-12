import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PERMISSIONS } from '../auth/constants/permissions.constants';

import { RoutineExerciseService } from './routine-exercise.service';
import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';

@Controller('routine-exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoutineExerciseController {
    constructor(private readonly routineExerciseService: RoutineExerciseService) {}

    @Post()
    @Permissions(PERMISSIONS.CREATE_ROUTINE)
    create(@Body() dto: CreateRoutineExerciseDto) {
        return this.routineExerciseService.create(dto);
    }

    @Get()
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findAll() {
        return this.routineExerciseService.findAll();
    }

    @Get(':id')
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.routineExerciseService.findOne(id);
    }

    @Patch(':id')
    @Permissions(PERMISSIONS.UPDATE_ROUTINE)
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateRoutineExerciseDto) {
        return this.routineExerciseService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(PERMISSIONS.DELETE_ROUTINE)
    async remove(@Param('id', PositiveIntPipe) id: number) {
        await this.routineExerciseService.remove(id);
    }
}
