export class AttendanceSummaryQueryDto {
  employeeId: number;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
}
