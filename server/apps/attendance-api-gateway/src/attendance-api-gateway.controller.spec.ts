import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceApiGatewayController } from './attendance-api-gateway.controller';
import { AttendanceApiGatewayService } from './attendance-api-gateway.service';

describe('AttendanceApiGatewayController', () => {
  let attendanceApiGatewayController: AttendanceApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceApiGatewayController],
      providers: [AttendanceApiGatewayService],
    }).compile();

    attendanceApiGatewayController = app.get<AttendanceApiGatewayController>(AttendanceApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(attendanceApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
