import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdatePasswordDto,
} from '../../../libs';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern('employee.findAll')
  findAll() {
    return this.employeeService.findAll();
  }

  @MessagePattern('employee.create')
  create(@Payload() dto: CreateEmployeeDto) {
    return this.employeeService.create(dto);
  }

  @MessagePattern('employee.findById')
  findById(@Payload() id: number) {
    return this.employeeService.findById(id);
  }

  @MessagePattern('employee.findByEmail')
  findByEmail(@Payload() email: string) {
    return this.employeeService.findByEmail(email);
  }

  @MessagePattern('employee.updateProfile')
  updateProfile(@Payload() payload: { id: number; dto: UpdateEmployeeDto }) {
    return this.employeeService.updateProfile(payload.id, payload.dto);
  }

  @MessagePattern('employee.updatePassword')
  updatePassword(@Payload() payload: { id: number; dto: UpdatePasswordDto }) {
    return this.employeeService.updatePassword(payload.id, payload.dto);
  }
}
