import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PERMISSIONS } from '../auth/constants/permissions.constants';
import { User } from '../auth/entities/user.entity';

import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Controller('routines')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoutineController {
    constructor(private readonly routineService: RoutineService) {}

    @Post()
    @Permissions(PERMISSIONS.CREATE_ROUTINE)
    create(@CurrentUser() user: User, @Body() dto: CreateRoutineDto) {
        return this.routineService.create(user.id, dto);
    }

    @Get()
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findAll() {
        return this.routineService.findAll();
    }

    @Get(':id')
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.routineService.findOne(id);
    }

    @Patch(':id')
    @Permissions(PERMISSIONS.UPDATE_ROUTINE)
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateRoutineDto) {
        return this.routineService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(PERMISSIONS.DELETE_ROUTINE)
    async remove(@Param('id', PositiveIntPipe) id: number) {
        await this.routineService.remove(id);
    }
}
