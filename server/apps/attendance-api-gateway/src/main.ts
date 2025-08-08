import { NestFactory } from '@nestjs/core';
import { AttendanceApiGatewayModule } from './attendance-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(AttendanceApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
