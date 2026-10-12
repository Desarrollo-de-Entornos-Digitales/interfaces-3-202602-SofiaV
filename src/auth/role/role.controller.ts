import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PermissionsGuard } from '../guards/permissions/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { PERMISSIONS } from '../constants/permissions.constants';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    @Permissions(PERMISSIONS.MANAGE_ROLES)
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Get()
    @Permissions(PERMISSIONS.MANAGE_ROLES)
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    @Permissions(PERMISSIONS.MANAGE_ROLES)
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(+id);
    }

    @Patch(':id')
    @Permissions(PERMISSIONS.MANAGE_ROLES)
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    @Permissions(PERMISSIONS.MANAGE_ROLES)
    remove(@Param('id') id: string) {
        return this.roleService.remove(+id);
    }
}
