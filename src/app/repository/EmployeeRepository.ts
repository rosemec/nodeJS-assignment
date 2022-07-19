import { getConnection, ObjectLiteral } from "typeorm";
import { Address } from "../entities/Address";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find()
    }
    async createEmployee(employee: Employee){
        const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.save(employee)
    }
    async getEmployeeById(id: any){
        const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.findOne(id);
    }
    async updateEmployee(id: string, updateEmp: Employee){
        const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.update({id: id}, updateEmp);
    }
    async deleteEmployee(id: any){
        const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.softDelete(id)
    }
    async getEmployeeByName(name: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name },
        });
        return employeeDetail;
    }
    // async updateAddress(id :string, address: Address){
    //     const addressRepo = getConnection().getRepository(Address);
    //     return await addressRepo.update(id, address)
    // }
}