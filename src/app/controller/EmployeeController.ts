import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import authorize from "../middleware/authorizationMiddleware";
import {Role} from '../constants'
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import { UpdateAddressDto } from "../dto/UpdateAddress";
import { PatchUpdateEmployeeDto } from "../dto/PatchUpdateEmployee";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllEmployees);
    //this.router.post(`${this.path}`,authorize([Role.ADMIN,Role.HR]), validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body), this.createEmployees);
    this.router.post(`${this.path}`, validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body), this.createEmployees);
    //this.router.get(`${this.path}/:id`, authorize([Role.ADMIN, Role.ENGINEER, Role.HR, Role.MANAGER]), this.getEmployee);
    this.router.get(`${this.path}/:id`, this.getEmployee);
    //this.router.put(`${this.path}/:id`, authorize([Role.ADMIN,Role.HR]), validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body), this.updateEmployee);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body), this.updateEmployee);
    //this.router.delete(`${this.path}/:id`,authorize([Role.ADMIN,Role.HR]), this.deleteEmployee);
    this.router.delete(`${this.path}/:id`, this.deleteEmployee);
    //this.router.put(`${this.path}/:id/address`, authorize([Role.ADMIN,Role.HR]), validationMiddleware(UpdateAddressDto, APP_CONSTANTS.body), this.updateAddress)
    this.router.post(`${this.path}/login`,this.login);
    this.router.patch(`${this.path}/:id`,  this.patchUpdateEmployee);
  }
  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "List of employees"};
      response.send(await this.employeeService.getAllEmployees());
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
  private createEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const employee: CreateEmployeeDto = request.body
      response.send(await this.employeeService.createEmployee(employee));
      response.status(200);
      //response.send(request.body);
    } catch (error) {
      return next(error);
    }
  }
  private getEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
      response.send(await this.employeeService.getEmployeeById(id));
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
  private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
        const updateEmployee : UpdateEmployeeDto = request.body
      response.send(await this.employeeService.updateEmployee(id, updateEmployee));
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
  private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id
      response.send(await this.employeeService.deleteEmployee(id));
    response.status(200);
    } catch (error) {
      return next(error);
    }
  }
  private login = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name,
      loginData.password
    );
    response.send(this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK"));
  };
  // private updateAddress = async (request: RequestWithUser,response: Response,next: NextFunction) => {
  //   try{
  //   const address: UpdateAddressDto = request.body;
  //   const id = request.params.id;
  //   response.send(await this.employeeService.updateAddress(id, address));
  //   response.status(200);
  //   }catch(error){
  //     return next(error)
  //   }
  // };
  private patchUpdateEmployee = async (request: RequestWithUser,response: Response,next: NextFunction) => {
    try{
    const address: PatchUpdateEmployeeDto = request.body;
    const id = request.params.id;
    response.send(await this.employeeService.patchUpdateAddress(id, address));
    response.status(200);
    }catch(error){
      return next(error)
    }
  };
}

export default EmployeeController;
