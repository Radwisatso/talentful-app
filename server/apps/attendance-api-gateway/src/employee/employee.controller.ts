import { Controller, Get } from '@nestjs/common';

import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }
}
