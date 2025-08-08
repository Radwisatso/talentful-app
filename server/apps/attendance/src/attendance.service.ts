import { Injectable } from '@nestjs/common';

type Attendance = {
  id: number;
  employeeId: number;
  date: string;
  status: string;
};

@Injectable()
export class AttendanceService {
  private attendanceRepository: Attendance[] = [
    { id: 1, employeeId: 1, date: '2023-10-01', status: 'Present' },
    { id: 2, employeeId: 2, date: '2023-10-01', status: 'Absent' },
    { id: 3, employeeId: 3, date: '2023-10-01', status: 'Present' },
  ];

  getAttendance() {
    return this.attendanceRepository;
  }

  getAttendanceById(id: number): Attendance | undefined {
    return this.attendanceRepository.find(
      (attendance) => attendance.id === +id,
    );
  }
}
