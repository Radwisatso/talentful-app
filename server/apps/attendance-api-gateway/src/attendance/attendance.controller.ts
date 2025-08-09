import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import {
  CreateAttendanceDto,
  AttendanceSummaryQueryDto,
} from '../../../../libs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles, Role } from '../auth/roles.guard';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // UNIVERSAL CHECKIN/CHECKOUT (Employee = self, Admin = any)

  @Post('checkin')
  @UseGuards(JwtAuthGuard)
  checkin(@Request() req, @Body() dto: Omit<CreateAttendanceDto, 'status'>) {
    // Employee: use own ID, Admin: can specify employeeId or use own ID
    const employeeId =
      req.user.role === 'ADMIN' && dto.employeeId
        ? dto.employeeId
        : req.user.id;

    return this.attendanceService.checkin({
      ...dto,
      employeeId,
    });
  }

  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  checkout(@Request() req, @Body() dto: Omit<CreateAttendanceDto, 'status'>) {
    // Employee: use own ID, Admin: can specify employeeId or use own ID
    const employeeId =
      req.user.role === 'ADMIN' && dto.employeeId
        ? dto.employeeId
        : req.user.id;

    return this.attendanceService.checkout({
      ...dto,
      employeeId,
    });
  }

  // SUMMARY & RECORDS (Flexible based on role)

  @Get('summary')
  @UseGuards(JwtAuthGuard)
  getSummary(@Request() req, @Query() query: AttendanceSummaryQueryDto) {
    // Employee: only own summary, Admin: any employee (if specified) or own
    const employeeId =
      req.user.role === 'ADMIN' && query.employeeId
        ? Number(query.employeeId)
        : req.user.id;

    return this.attendanceService.getSummary({
      ...query,
      employeeId,
    });
  }

  @Get('records')
  @UseGuards(JwtAuthGuard)
  getAttendanceRecords(
    @Request() req,
    @Query('employeeId') employeeId?: string,
  ) {
    // Employee: only own records, Admin: any employee (if specified) or own
    const targetEmployeeId =
      req.user.role === 'ADMIN' && employeeId
        ? Number(employeeId)
        : req.user.id;

    return this.attendanceService.getAttendancesByEmployee(targetEmployeeId);
  }

  // ADMIN ONLY ENDPOINTS

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAllAttendances() {
    return this.attendanceService.getAllAttendances();
  }
}
