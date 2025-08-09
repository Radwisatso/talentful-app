import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateAttendanceDto,
  AttendanceSummaryQueryDto,
} from '../../../../libs';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject('ATTENDANCE_CLIENT') private readonly client: ClientProxy,
  ) {}

  checkin(dto: Omit<CreateAttendanceDto, 'status'>) {
    return firstValueFrom(this.client.send('attendance.checkin', dto));
  }

  checkout(dto: Omit<CreateAttendanceDto, 'status'>) {
    return firstValueFrom(this.client.send('attendance.checkout', dto));
  }

  getSummary(query: AttendanceSummaryQueryDto) {
    return firstValueFrom(this.client.send('attendance.summary', query));
  }

  getAllAttendances() {
    return firstValueFrom(this.client.send('attendance.getAll', {}));
  }

  getAttendancesByEmployee(employeeId: number) {
    return firstValueFrom(
      this.client.send('attendance.getByEmployee', employeeId),
    );
  }
}
