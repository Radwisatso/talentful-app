import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmployeeService {
  constructor(@Inject('EMPLOYEE_CLIENT') private employeeClient: ClientProxy) {}

  findAll() {
    return this.employeeClient.send('employee.findAll', {});
  }
}
