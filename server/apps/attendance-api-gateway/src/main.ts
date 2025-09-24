import { NestFactory } from '@nestjs/core';
import { AttendanceApiGatewayModule } from './attendance-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(AttendanceApiGatewayModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
