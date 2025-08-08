import { Controller, Get } from '@nestjs/common';
import { AttendanceApiGatewayService } from './attendance-api-gateway.service';

@Controller()
export class AttendanceApiGatewayController {
  constructor(private readonly attendanceApiGatewayService: AttendanceApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.attendanceApiGatewayService.getHello();
  }
}
