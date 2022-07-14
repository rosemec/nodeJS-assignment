import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { UpdateAddressDto } from "../dto/UpdateAddress";
import { UpdateDepartmentDto } from "../dto/UpdateDepartment";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { DepartmentRespository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";

export default class DepartmentService {
    constructor(private departmentRepo: DepartmentRespository) {

    }
    async getAllDepartments(){
        const departmentResp = await this.departmentRepo.getAllDepartments()
        return departmentResp;
    }
    async createDepartment(department: CreateDepartmentDto){
        const newDept : Department = plainToClass(Department,{
            name: department.name
        })
        return await this.departmentRepo.createDepartment(newDept)
    }
    async updateDepartment(id: string, updateDept: UpdateDepartmentDto){
        const deptDetails = await this.departmentRepo.getDepartmentById(id);
        if(!deptDetails){
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND)
        }
        const newDept : Department = plainToClass(Department,{
            name: updateDept.name
        });
        return await this.departmentRepo.updateDepartment(id, newDept)   
    }
    async deleteDepartment(id: string){
        const deptDetails = await this.departmentRepo.getDepartmentById(id);
        if(!deptDetails){
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND)
        }
        return await this.departmentRepo.deleteDepartment(id)
    }
    async getDepartmentById(id: string){
        const deptDetails = await this.departmentRepo.getDepartmentById(id);
        if(!deptDetails){
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND)
        }
        return deptDetails
    }
}