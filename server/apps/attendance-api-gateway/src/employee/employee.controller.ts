import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdatePasswordDto,
} from '../../../../libs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles, Role } from '../auth/roles.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // PUBLIC ENDPOINTS
  @Post('validate')
  validateEmployee(@Body() dto: { email: string; password: string }) {
    return this.employeeService.validateEmployee(dto.email, dto.password);
  }

  // ADMIN ONLY ENDPOINTS
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll(@Request() req) {
    console.log(req);
    return this.employeeService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.create(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findById(@Param('id') id: string) {
    return this.employeeService.findById(Number(id));
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findByEmail(@Param('email') email: string) {
    return this.employeeService.findByEmail(email);
  }

  // FLEXIBLE ENDPOINTS (Employee own data or Admin any data)
  @Patch(':id/profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
    @Request() req,
  ) {
    const targetId = Number(id);

    // Employee can only update their own profile, Admin can update any
    if (req.user.role !== 'ADMIN' && req.user.id !== targetId) {
      throw new ForbiddenException('You can only update your own profile');
    }

    return this.employeeService.updateProfile(targetId, dto);
  }

  @Patch(':id/password')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
    @Request() req,
  ) {
    const targetId = Number(id);

    // Employee can only update their own password, Admin can update any
    if (req.user.role !== 'ADMIN' && req.user.id !== targetId) {
      throw new ForbiddenException('You can only update your own password');
    }

    return this.employeeService.updatePassword(targetId, dto);
  }
}
