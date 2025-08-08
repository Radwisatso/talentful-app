import { Injectable } from '@nestjs/common';

type Employee = {
  id: number;
  name: string;
  position: string;
};

@Injectable()
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager' },
    { id: 3, name: 'Alice Johnson', position: 'UX Designer' },
  ];

  findAll() {
    return this.employees;
  }
}
