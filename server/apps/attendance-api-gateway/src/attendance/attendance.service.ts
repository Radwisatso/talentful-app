import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject('ATTENDANCE_CLIENT') private attendanceClient: ClientProxy,
  ) {}

  getAttendances() {
    return this.attendanceClient.send('attendance.getAttendance', {});
  }

  getAttendanceById(id: number) {
    return this.attendanceClient.send('attendance.getAttendanceById', id);
  }
}
