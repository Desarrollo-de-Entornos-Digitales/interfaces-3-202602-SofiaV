import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PERMISSIONS } from '../auth/constants/permissions.constants';

import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) {}

    // El catálogo es de administración: solo quien tiene manage_exercises puede modificarlo
    @Post()
    @Permissions(PERMISSIONS.MANAGE_EXERCISES)
    create(@Body() dto: CreateExerciseDto) {
        return this.exerciseService.create(dto);
    }

    // Consultar el catálogo es necesario para armar rutinas, por eso basta con read_routine
    @Get()
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findAll() {
        return this.exerciseService.findAll();
    }

    @Get(':id')
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.exerciseService.findOne(id);
    }

    @Patch(':id')
    @Permissions(PERMISSIONS.MANAGE_EXERCISES)
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateExerciseDto) {
        return this.exerciseService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(PERMISSIONS.MANAGE_EXERCISES)
    async remove(@Param('id', PositiveIntPipe) id: number) {
        await this.exerciseService.remove(id);
    }
}
