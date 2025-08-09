import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, AttendanceSummaryQueryDto } from '../../../libs';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @MessagePattern('attendance.checkin')
  checkin(@Payload() dto: Omit<CreateAttendanceDto, 'status'>) {
    return this.attendanceService.checkin(dto);
  }

  @MessagePattern('attendance.checkout')
  checkout(@Payload() dto: Omit<CreateAttendanceDto, 'status'>) {
    return this.attendanceService.checkout(dto);
  }

  @MessagePattern('attendance.summary')
  getSummary(@Payload() query: AttendanceSummaryQueryDto) {
    return this.attendanceService.getSummary(query);
  }

  @MessagePattern('attendance.getAll')
  getAllAttendances() {
    return this.attendanceService.getAllAttendances();
  }

  @MessagePattern('attendance.getByEmployee')
  getAttendancesByEmployee(@Payload() employeeId: number) {
    return this.attendanceService.getAttendancesByEmployee(employeeId);
  }
}
