import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';

export interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // Validate user credentials via employee microservice
    const employee = await this.employeeService.validateEmployee(
      loginDto.email,
      loginDto.password,
    );
    if (!employee) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // Generate JWT payload
    const payload = {
      sub: employee.id,
      email: employee.email,
      name: employee.name,
      role: employee.role,
    };

    // Generate access token
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour
      user: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        position: employee.position,
        photoUrl: employee.photoUrl,
        phoneNumber: employee.phoneNumber,
      },
    };
  }

  async validateUser(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  }
}
