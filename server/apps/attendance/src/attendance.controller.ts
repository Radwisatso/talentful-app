import { Controller } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @MessagePattern('attendance.getAttendance')
  getAttendance() {
    return this.attendanceService.getAttendance();
  }

  @MessagePattern('attendance.getAttendanceById')
  getAttendanceById(id: number) {
    return this.attendanceService.getAttendanceById(id);
  }
}
