import { Module } from '@nestjs/common';
import { AttendanceApiGatewayController } from './attendance-api-gateway.controller';
import { AttendanceApiGatewayService } from './attendance-api-gateway.service';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [EmployeeModule, AttendanceModule],
  controllers: [AttendanceApiGatewayController],
  providers: [AttendanceApiGatewayService],
})
export class AttendanceApiGatewayModule {}
