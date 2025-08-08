/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/attendance-api-gateway/src/attendance-api-gateway.controller.ts":
/*!******************************************************************************!*\
  !*** ./apps/attendance-api-gateway/src/attendance-api-gateway.controller.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceApiGatewayController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attendance_api_gateway_service_1 = __webpack_require__(/*! ./attendance-api-gateway.service */ "./apps/attendance-api-gateway/src/attendance-api-gateway.service.ts");
let AttendanceApiGatewayController = class AttendanceApiGatewayController {
    attendanceApiGatewayService;
    constructor(attendanceApiGatewayService) {
        this.attendanceApiGatewayService = attendanceApiGatewayService;
    }
    getHello() {
        return this.attendanceApiGatewayService.getHello();
    }
};
exports.AttendanceApiGatewayController = AttendanceApiGatewayController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AttendanceApiGatewayController.prototype, "getHello", null);
exports.AttendanceApiGatewayController = AttendanceApiGatewayController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof attendance_api_gateway_service_1.AttendanceApiGatewayService !== "undefined" && attendance_api_gateway_service_1.AttendanceApiGatewayService) === "function" ? _a : Object])
], AttendanceApiGatewayController);


/***/ }),

/***/ "./apps/attendance-api-gateway/src/attendance-api-gateway.module.ts":
/*!**************************************************************************!*\
  !*** ./apps/attendance-api-gateway/src/attendance-api-gateway.module.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceApiGatewayModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attendance_api_gateway_controller_1 = __webpack_require__(/*! ./attendance-api-gateway.controller */ "./apps/attendance-api-gateway/src/attendance-api-gateway.controller.ts");
const attendance_api_gateway_service_1 = __webpack_require__(/*! ./attendance-api-gateway.service */ "./apps/attendance-api-gateway/src/attendance-api-gateway.service.ts");
const employee_module_1 = __webpack_require__(/*! ./employee/employee.module */ "./apps/attendance-api-gateway/src/employee/employee.module.ts");
const attendance_module_1 = __webpack_require__(/*! ./attendance/attendance.module */ "./apps/attendance-api-gateway/src/attendance/attendance.module.ts");
let AttendanceApiGatewayModule = class AttendanceApiGatewayModule {
};
exports.AttendanceApiGatewayModule = AttendanceApiGatewayModule;
exports.AttendanceApiGatewayModule = AttendanceApiGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [employee_module_1.EmployeeModule, attendance_module_1.AttendanceModule],
        controllers: [attendance_api_gateway_controller_1.AttendanceApiGatewayController],
        providers: [attendance_api_gateway_service_1.AttendanceApiGatewayService],
    })
], AttendanceApiGatewayModule);


/***/ }),

/***/ "./apps/attendance-api-gateway/src/attendance-api-gateway.service.ts":
/*!***************************************************************************!*\
  !*** ./apps/attendance-api-gateway/src/attendance-api-gateway.service.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceApiGatewayService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AttendanceApiGatewayService = class AttendanceApiGatewayService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AttendanceApiGatewayService = AttendanceApiGatewayService;
exports.AttendanceApiGatewayService = AttendanceApiGatewayService = __decorate([
    (0, common_1.Injectable)()
], AttendanceApiGatewayService);


/***/ }),

/***/ "./apps/attendance-api-gateway/src/attendance/attendance.controller.ts":
/*!*****************************************************************************!*\
  !*** ./apps/attendance-api-gateway/src/attendance/attendance.controller.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attendance_service_1 = __webpack_require__(/*! ./attendance.service */ "./apps/attendance-api-gateway/src/attendance/attendance.service.ts");
let AttendanceController = class AttendanceController {
    attendanceService;
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    getAttendances() {
        return this.attendanceService.getAttendances();
    }
    getAttendanceById({ id }) {
        return this.attendanceService.getAttendanceById(+id);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getAttendances", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getAttendanceById", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)('attendances'),
    __metadata("design:paramtypes", [typeof (_a = typeof attendance_service_1.AttendanceService !== "undefined" && attendance_service_1.AttendanceService) === "function" ? _a : Object])
], AttendanceController);


/***/ }),

/***/ "./apps/attendance-api-gateway/src/attendance/attendance.module.ts":
/*!*************************************************************************!*\
  !*** ./apps/attendance-api-gateway/src/attendance/attendance.module.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attendance_service_1 = __webpack_require__(/*! ./attendance.service */ "./apps/attendance-api-gateway/src/attendance/attendance.service.ts");
const attendance_controller_1 = __webpack_require__(/*! ./attendance.controller */ "./apps/attendance-api-gateway/src/attendance/attendance.controller.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let AttendanceModule = class AttendanceModule {
};
exports.AttendanceModule = AttendanceModule;
exports.AttendanceModule = AttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'ATTENDANCE_CLIENT',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        port: 3002,
                    },
                },
            ]),
        ],
        providers: [attendance_service_1.AttendanceService],
        controllers: [attendance_controller_1.AttendanceController],
    })
], AttendanceModule);


/***/ }),

/***/ "./apps/attendance-api-gateway/src/attendance/attendance.service.ts":
/*!**************************************************************************!*\
  !*** ./apps/attendance-api-gateway/src/attendance/attendance.service.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let AttendanceService = class AttendanceService {
    attendanceClient;
    constructor(attendanceClient) {
        this.attendanceClient = attendanceClient;
    }
    getAttendances() {
        return this.attendanceClient.send('attendance.getAttendance', {});
    }
    getAttendanceById(id) {
        return this.attendanceClient.send('attendance.getAttendanceById', id);
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ATTENDANCE_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AttendanceService);


/***/ }),

/***/ "./apps/attendance-api-gateway/src/employee/employee.controller.ts":
/*!*************************************************************************!*\
  !*** ./apps/attendance-api-gateway/src/employee/employee.controller.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_service_1 = __webpack_require__(/*! ./employee.service */ "./apps/attendance-api-gateway/src/employee/employee.service.ts");
let EmployeeController = class EmployeeController {
    employeeService;
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    findAll() {
        return this.employeeService.findAll();
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "findAll", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_service_1.EmployeeService !== "undefined" && employee_service_1.EmployeeService) === "function" ? _a : Object])
], EmployeeController);


/***/ }),

/***/ "./apps/attendance-api-gateway/src/employee/employee.module.ts":
/*!*********************************************************************!*\
  !*** ./apps/attendance-api-gateway/src/employee/employee.module.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const employee_service_1 = __webpack_require__(/*! ./employee.service */ "./apps/attendance-api-gateway/src/employee/employee.service.ts");
const employee_controller_1 = __webpack_require__(/*! ./employee.controller */ "./apps/attendance-api-gateway/src/employee/employee.controller.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'EMPLOYEE_CLIENT',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        port: 3001,
                    },
                },
            ]),
        ],
        providers: [employee_service_1.EmployeeService],
        controllers: [employee_controller_1.EmployeeController],
    })
], EmployeeModule);


/***/ }),

/***/ "./apps/attendance-api-gateway/src/employee/employee.service.ts":
/*!**********************************************************************!*\
  !*** ./apps/attendance-api-gateway/src/employee/employee.service.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let EmployeeService = class EmployeeService {
    employeeClient;
    constructor(employeeClient) {
        this.employeeClient = employeeClient;
    }
    findAll() {
        return this.employeeClient.send('employee.findAll', {});
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('EMPLOYEE_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], EmployeeService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************************************!*\
  !*** ./apps/attendance-api-gateway/src/main.ts ***!
  \*************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const attendance_api_gateway_module_1 = __webpack_require__(/*! ./attendance-api-gateway.module */ "./apps/attendance-api-gateway/src/attendance-api-gateway.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(attendance_api_gateway_module_1.AttendanceApiGatewayModule);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();

})();

/******/ })()
;