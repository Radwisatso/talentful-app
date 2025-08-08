export enum Role {
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
}

export class CreateEmployeeDto {
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  position: string;
  phoneNumber?: string;
  role?: Role; // default: EMPLOYEE
}
