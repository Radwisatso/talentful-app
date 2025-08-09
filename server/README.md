<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Dexa Attendance Management System

A microservices-based attendance management system built with NestJS, featuring JWT authentication, role-based authorization, and PostgreSQL database integration.

## 🏗️ Architecture

```
┌─────────────────────────────────┐    ┌──────────────────┐
│     API Gateway (Port 3000)    │    │   PostgreSQL     │
│  - Authentication (JWT)        │────│    Database      │
│  - Authorization (RBAC)        │    │                  │
│  - Route Management             │    └──────────────────┘
└─────────────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼────────┐    ┌─────▼─────────┐
│  Employee  │    │  Attendance   │
│Microservice│    │ Microservice  │
│(Port 3001) │    │ (Port 3002)   │
└────────────┘    └───────────────┘
```

## 📁 Project Structure

```
server/
├── apps/
│   ├── attendance-api-gateway/     # Main API Gateway
│   │   ├── src/
│   │   │   ├── auth/              # Authentication & Authorization
│   │   │   ├── employee/          # Employee Gateway Routes
│   │   │   ├── attendance/        # Attendance Gateway Routes
│   │   │   └── main.ts
│   │   └── tsconfig.app.json
│   ├── employee/                   # Employee Microservice
│   │   ├── src/
│   │   │   ├── employee.controller.ts
│   │   │   ├── employee.service.ts
│   │   │   ├── password.service.ts
│   │   │   ├── employee.filter.ts
│   │   │   └── main.ts
│   │   └── tsconfig.app.json
│   └── attendance/                 # Attendance Microservice
│       ├── src/
│       │   ├── attendance.controller.ts
│       │   ├── attendance.service.ts
│       │   └── main.ts
│       └── tsconfig.app.json
├── libs/
│   ├── contracts/                  # Shared DTOs & Interfaces
│   └── prisma/                    # Database Module
├── prisma/
│   ├── schema.prisma              # Database Schema
│   └── migrations/                # Database Migrations
└── http/                          # HTTP Test Files
    ├── auth.http
    ├── employee.http
    └── attendance.http
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dexa/server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/dexa_attendance"

   # JWT Authentication
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_EXPIRES_IN="1h"
   ```

5. **Database setup**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   npx prisma db seed
   ```

### Running the Application

#### Development Mode

```bash
# Start all services
npm run start:dev:employee   # Employee Microservice (Port 3001)
npm run start:dev:attendance # Attendance Microservice (Port 3002)
npm run start:dev:gateway    # API Gateway (Port 3000)
```

## 🔐 Authentication & Authorization

### JWT Authentication

The system uses JWT-based authentication with role-based access control.

**Roles:**

- `EMPLOYEE` - Can manage own data only
- `ADMIN` - Can manage all system data

### Getting Started with Auth

1. **Login**

   ```http
   POST http://localhost:3000/auth/login
   Content-Type: application/json

   {
     "email": "admin@company.com",
     "password": "admin123"
   }
   ```

2. **Use JWT Token**
   ```http
   GET http://localhost:3000/employees/profile
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

## 📊 API Endpoints

### Authentication

| Method | Endpoint      | Access | Description |
| ------ | ------------- | ------ | ----------- |
| POST   | `/auth/login` | Public | User login  |

### Employee Management

| Method | Endpoint                  | Access      | Description           |
| ------ | ------------------------- | ----------- | --------------------- |
| GET    | `/employees`              | Admin       | Get all employees     |
| POST   | `/employees`              | Admin       | Create employee       |
| GET    | `/employees/:id`          | Admin       | Get employee by ID    |
| GET    | `/employees/email/:email` | Admin       | Get employee by email |
| PATCH  | `/employees/:id/profile`  | Owner/Admin | Update profile        |
| PATCH  | `/employees/:id/password` | Owner/Admin | Change password       |
| POST   | `/employees/validate`     | Public      | Validate credentials  |

### Attendance Management

| Method | Endpoint                | Access        | Description                  |
| ------ | ----------------------- | ------------- | ---------------------------- |
| POST   | `/attendances/checkin`  | Authenticated | Check in (self/admin-any)    |
| POST   | `/attendances/checkout` | Authenticated | Check out (self/admin-any)   |
| GET    | `/attendances/summary`  | Authenticated | Get summary (self/admin-any) |
| GET    | `/attendances/records`  | Authenticated | Get records (self/admin-any) |
| GET    | `/attendances/all`      | Admin         | Get all attendance records   |

## 🧪 Testing

### HTTP Test Files

Use the provided HTTP test files for API testing:

- `http/auth.http` - Authentication tests
- `http/employee.http` - Employee management tests
- `http/attendance.http` - Attendance management tests

### Test Flow

1. **Login** to get JWT token
2. **Copy token** to test file variables
3. **Run tests** for different scenarios:
   - Success cases
   - Unauthorized access (401)
   - Forbidden access (403)
   - Edge cases

### Unit & E2E Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🗄️ Database Schema

### Employee Table

- `id` - Primary key
- `name` - Full name
- `email` - Email address (unique)
- `password` - Hashed password
- `role` - EMPLOYEE | ADMIN
- `position` - Job position
- `phoneNumber` - Contact number
- `photoUrl` - Profile photo URL
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Attendance Table

- `id` - Primary key
- `employeeId` - Foreign key to Employee
- `date` - Attendance date
- `time` - Check-in/out time
- `status` - CHECKIN | CHECKOUT
- `createdAt` - Creation timestamp

## 📦 Technologies Used

### Core

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Modern database toolkit
- **PostgreSQL** - Relational database

### Authentication & Security

- **JWT** - JSON Web Tokens
- **bcrypt** - Password hashing
- **Passport** - Authentication middleware

### Communication

- **TCP** - Inter-microservice communication
- **RxJS** - Reactive programming

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🔧 Configuration

### Environment Variables

| Variable         | Description                  | Default |
| ---------------- | ---------------------------- | ------- |
| `DATABASE_URL`   | PostgreSQL connection string | -       |
| `JWT_SECRET`     | JWT signing secret           | -       |
| `JWT_EXPIRES_IN` | JWT expiration time          | `1h`    |

### Ports

| Service                 | Port | Description         |
| ----------------------- | ---- | ------------------- |
| API Gateway             | 3000 | Main entry point    |
| Employee Microservice   | 3001 | Employee management |
| Attendance Microservice | 3002 | Attendance tracking |
