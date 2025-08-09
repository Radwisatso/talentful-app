import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdatePasswordDto,
} from '../../../../libs';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.create(dto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.employeeService.findById(Number(id));
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.employeeService.findByEmail(email);
  }

  @Patch(':id/profile')
  updateProfile(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.employeeService.updateProfile(Number(id), dto);
  }

  @Patch(':id/password')
  updatePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    return this.employeeService.updatePassword(Number(id), dto);
  }
}
