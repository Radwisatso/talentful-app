import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  CreateAttendanceDto,
  AttendanceSummaryQueryDto,
} from '../../../libs';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async checkin(dto: Omit<CreateAttendanceDto, 'status'>) {
    console.log(dto);
    return this.prisma.attendance.create({
      data: {
        ...dto,
        status: 'CHECKIN',
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            position: true,
          },
        },
      },
    });
  }

  async checkout(dto: Omit<CreateAttendanceDto, 'status'>) {
    return this.prisma.attendance.create({
      data: {
        ...dto,
        status: 'CHECKOUT',
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            position: true,
          },
        },
      },
    });
  }

  async getSummary(query: AttendanceSummaryQueryDto) {
    // Default: awal bulan sampai hari ini
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const start = query.startDate ? new Date(query.startDate) : startOfMonth;
    const end = query.endDate ? new Date(query.endDate) : now;

    const attendances = await this.prisma.attendance.findMany({
      where: {
        employeeId: query.employeeId,
        date: {
          gte: start,
          lte: end,
        },
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            position: true,
          },
        },
      },
      orderBy: [{ date: 'desc' }, { time: 'desc' }],
    });

    // Calculate summary
    const checkinCount = attendances.filter(
      (a) => a.status === 'CHECKIN',
    ).length;
    const checkoutCount = attendances.filter(
      (a) => a.status === 'CHECKOUT',
    ).length;

    // Group by date for better summary
    const attendancesByDate = attendances.reduce(
      (acc, attendance) => {
        const dateKey = attendance.date.toISOString().split('T')[0];
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(attendance);
        return acc;
      },
      {} as Record<string, typeof attendances>,
    );

    return {
      attendances,
      attendancesByDate,
      summary: {
        totalCheckin: checkinCount,
        totalCheckout: checkoutCount,
        totalAttendanceDays: Object.keys(attendancesByDate).length,
        period: {
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0],
        },
      },
    };
  }

  async getAllAttendances() {
    return this.prisma.attendance.findMany({
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            position: true,
          },
        },
      },
      orderBy: [{ date: 'desc' }, { time: 'desc' }],
    });
  }

  async getAttendancesByEmployee(employeeId: number) {
    return this.prisma.attendance.findMany({
      where: { employeeId },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            position: true,
          },
        },
      },
      orderBy: [{ date: 'desc' }, { time: 'desc' }],
    });
  }
}
