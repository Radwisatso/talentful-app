import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import {
  PrismaService,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdatePasswordDto,
} from '../../../libs';
import { PasswordService } from './password.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async findAll() {
    return this.prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        position: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateEmployeeDto) {
    // Hash password before storing
    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );

    const employee = await this.prisma.employee.create({
      data: {
        ...dto,
        password: hashedPassword,
        role: dto.role || 'EMPLOYEE',
      },
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        position: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return employee;
  }

  async findById(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        position: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async findByEmail(email: string) {
    return this.prisma.employee.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        position: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // For authentication - include password
  async findByEmailWithPassword(email: string) {
    return this.prisma.employee.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        photoUrl: true,
        position: true,
        phoneNumber: true,
        role: true,
      },
    });
  }

  async updateProfile(id: number, dto: UpdateEmployeeDto) {
    try {
      return await this.prisma.employee.update({
        where: { id },
        data: dto,
        select: {
          id: true,
          name: true,
          email: true,
          photoUrl: true,
          position: true,
          phoneNumber: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch {
      throw new NotFoundException('Employee not found');
    }
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    // Get employee with password
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      select: { id: true, password: true },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await this.passwordService.comparePassword(
      dto.currentPassword,
      employee.password,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const hashedNewPassword = await this.passwordService.hashPassword(
      dto.newPassword,
    );

    return this.prisma.employee.update({
      where: { id },
      data: { password: hashedNewPassword },
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        position: true,
        phoneNumber: true,
        role: true,
        updatedAt: true,
      },
    });
  }

  // Method for login authentication
  async validateEmployee(email: string, password: string) {
    const employee = await this.findByEmailWithPassword(email);

    if (!employee) {
      return null;
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      employee.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    // Return employee without password
    const { password: _, ...result } = employee;
    return result;
  }
}
