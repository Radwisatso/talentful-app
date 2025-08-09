import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdatePasswordDto,
} from '../../../../libs';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_CLIENT') private readonly client: ClientProxy,
  ) {}

  async findAll() {
    try {
      return await firstValueFrom(this.client.send('employee.findAll', {}));
    } catch (error) {
      this.handleMicroserviceError(error);
    }
  }

  async create(dto: CreateEmployeeDto) {
    try {
      return await firstValueFrom(this.client.send('employee.create', dto));
    } catch (error) {
      this.handleMicroserviceError(error);
    }
  }

  async findById(id: number) {
    try {
      return await firstValueFrom(this.client.send('employee.findById', id));
    } catch (error) {
      this.handleMicroserviceError(error);
    }
  }

  async findByEmail(email: string) {
    try {
      return await firstValueFrom(
        this.client.send('employee.findByEmail', email),
      );
    } catch (error) {
      this.handleMicroserviceError(error);
    }
  }

  async updateProfile(id: number, dto: UpdateEmployeeDto) {
    try {
      return await firstValueFrom(
        this.client.send('employee.updateProfile', { id, dto }),
      );
    } catch (error) {
      this.handleMicroserviceError(error);
    }
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    try {
      return await firstValueFrom(
        this.client.send('employee.updatePassword', { id, dto }),
      );
    } catch (error) {
      this.handleMicroserviceError(error);
    }
  }

  async validateEmployee(email: string, password: string) {
    try {
      return await firstValueFrom(
        this.client.send('employee.validate', { email, password }),
      );
    } catch (error) {
      this.handleMicroserviceError(error);
    }
  }

  private handleMicroserviceError(error: any): never {
    // Handle RpcException - error data is in error.error property
    if (error.error && error.error.statusCode) {
      throw new HttpException(error.error.message, error.error.statusCode);
    }

    // Fallback for direct error properties
    if (error.statusCode) {
      throw new HttpException(error.message, error.statusCode);
    }

    // Handle unknown errors
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
