import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  PrismaService,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdatePasswordDto,
} from '../../../libs';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.employee.create({
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
    const employee = await this.findById(id);
    if (!dto.newPassword)
      throw new BadRequestException('New password required');

    return this.prisma.employee.update({
      where: { id: employee.id },
      data: { password: dto.newPassword },
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
}
