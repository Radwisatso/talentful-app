import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EmployeeModule } from './employee.module';
import { EmployeeRpcExceptionFilter } from './employee.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmployeeModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    },
  );

  // Apply global exception filter
  app.useGlobalFilters(new EmployeeRpcExceptionFilter());

  await app.listen();
}
bootstrap();
