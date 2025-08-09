import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export enum Role {
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
}

// Simplified version - gunakan SetMetadata dari NestJS
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Ambil roles yang dibutuhkan dari decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // Method level (@Roles() di atas method)
      context.getClass(), // Class level (@Roles() di atas class)
    ]);

    // 2. Kalau tidak ada role requirement, allow access
    if (!requiredRoles) {
      return true;
    }

    // 3. Ambil user dari request (sudah diset oleh JWT Guard)
    const { user } = context.switchToHttp().getRequest();

    // 4. Check apakah user role match dengan required roles
    return requiredRoles.some((role) => user.role === role);
  }
}
