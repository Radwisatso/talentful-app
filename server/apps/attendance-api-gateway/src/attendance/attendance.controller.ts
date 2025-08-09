import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import {
  CreateAttendanceDto,
  AttendanceSummaryQueryDto,
} from '../../../../libs';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('checkin')
  checkin(@Body() dto: Omit<CreateAttendanceDto, 'status'>) {
    return this.attendanceService.checkin(dto);
  }

  @Post('checkout')
  checkout(@Body() dto: Omit<CreateAttendanceDto, 'status'>) {
    return this.attendanceService.checkout(dto);
  }

  @Get('summary')
  getSummary(@Query() query: AttendanceSummaryQueryDto) {
    const parsedQuery = {
      ...query,
      employeeId: Number(query.employeeId),
    };
    return this.attendanceService.getSummary(parsedQuery);
  }

  @Get('all')
  getAllAttendances() {
    return this.attendanceService.getAllAttendances();
  }

  @Get('employee/:id')
  getAttendancesByEmployee(@Param('id') id: string) {
    return this.attendanceService.getAttendancesByEmployee(Number(id));
  }
}
