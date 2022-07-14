import { getConnection, ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository{
    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find({relations: ['employee']});
    }
    async createDepartment(department: Department){
        const departmentRepo = getConnection().getRepository(Department);
        return await departmentRepo.save(department);
    }
    async updateDepartment(id:string, department: Department){
        const departmentRepo = getConnection().getRepository(Department);
        return await departmentRepo.update(id, department);
    }
    async getDepartmentById(id: string){
        const departmentRepo = getConnection().getRepository(Department);
        return await departmentRepo.findOne(id);
    }
    async deleteDepartment(id: string){
        const departmentRepo = getConnection().getRepository(Department);
        return await departmentRepo.softDelete(id);
    }
    }