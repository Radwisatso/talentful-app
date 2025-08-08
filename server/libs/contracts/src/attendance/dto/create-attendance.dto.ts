export enum AttendanceStatus {
  CHECKIN = 'CHECKIN',
  CHECKOUT = 'CHECKOUT',
}

export class CreateAttendanceDto {
  employeeId: number;
  date: Date;
  time: Date;
  status: AttendanceStatus;
}
