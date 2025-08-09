import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateEmployeeDto } from '../../../../libs/contracts/src/employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../../../libs/contracts/src/employee/dto/update-employee.dto';
import { UpdatePasswordDto } from '../../../../libs/contracts/src/employee/dto/update-password.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_CLIENT') private readonly client: ClientProxy,
  ) {}

  findAll() {
    return firstValueFrom(this.client.send('employee.findAll', {}));
  }

  create(dto: CreateEmployeeDto) {
    return firstValueFrom(this.client.send('employee.create', dto));
  }

  findById(id: number) {
    return firstValueFrom(this.client.send('employee.findById', id));
  }

  findByEmail(email: string) {
    return firstValueFrom(this.client.send('employee.findByEmail', email));
  }

  updateProfile(id: number, dto: UpdateEmployeeDto) {
    return firstValueFrom(
      this.client.send('employee.updateProfile', { id, dto }),
    );
  }

  updatePassword(id: number, dto: UpdatePasswordDto) {
    return firstValueFrom(
      this.client.send('employee.updatePassword', { id, dto }),
    );
  }
}
