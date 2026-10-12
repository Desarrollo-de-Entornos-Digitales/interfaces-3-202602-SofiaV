import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PERMISSIONS } from '../auth/constants/permissions.constants';
import { User } from '../auth/entities/user.entity';

import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Controller('activity-logs')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ActivityLogController {
    constructor(private readonly activityLogService: ActivityLogService) {}

    @Post()
    @Permissions(PERMISSIONS.CREATE_ROUTINE)
    create(@CurrentUser() user: User, @Body() dto: CreateActivityLogDto) {
        return this.activityLogService.create(user.id, dto);
    }

    @Get()
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findAll() {
        return this.activityLogService.findAll();
    }

    @Get(':id')
    @Permissions(PERMISSIONS.READ_ROUTINE)
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.activityLogService.findOne(id);
    }

    @Patch(':id')
    @Permissions(PERMISSIONS.UPDATE_ROUTINE)
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateActivityLogDto) {
        return this.activityLogService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(PERMISSIONS.DELETE_ROUTINE)
    async remove(@Param('id', PositiveIntPipe) id: number) {
        await this.activityLogService.remove(id);
    }
}
