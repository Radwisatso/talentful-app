import { Controller, Get, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  getAttendances() {
    return this.attendanceService.getAttendances();
  }

  @Get(':id')
  getAttendanceById(@Param() { id }: { id: string }) {
    return this.attendanceService.getAttendanceById(+id);
  }
}
