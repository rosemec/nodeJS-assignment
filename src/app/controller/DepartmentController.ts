import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import DepartmentService from "../service/DepartmentService";
import authorize from "../middleware/authorizationMiddleware";
import {Role} from '../constants'
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { UpdateDepartmentDto } from "../dto/UpdateDepartment";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize([Role.ADMIN, Role.ENGINEER, Role.HR, Role.MANAGER]), this.getAllDepartments);
    this.router.post(`${this.path}`, authorize([Role.ADMIN,Role.HR]), validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body), this.createDepartments);
    this.router.put(`${this.path}/:id`, authorize([Role.ADMIN,Role.HR]), validationMiddleware(UpdateDepartmentDto, APP_CONSTANTS.body), this.updateDepartment);
    this.router.delete(`${this.path}/:id`, authorize([Role.ADMIN,Role.HR]), this.deleteDepartment);
    this.router.get(`${this.path}/:id`, authorize([Role.ADMIN, Role.ENGINEER, Role.HR, Role.MANAGER]), this.getDepartmentById);
  }
  private getAllDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "List of departments"};
      response.send(await this.departmentService.getAllDepartments());
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
  private createDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const department: CreateDepartmentDto = request.body
      response.send(await this.departmentService.createDepartment(department));
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
  private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const updateDept: UpdateDepartmentDto = request.body
      const id = request.params.id
      response.send(await this.departmentService.updateDepartment(id, updateDept));
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
  private deleteDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id
      response.send(await this.departmentService.deleteDepartment(id));
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
  private getDepartmentById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id
      response.send(await this.departmentService.getDepartmentById(id));
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
}

export default DepartmentController;