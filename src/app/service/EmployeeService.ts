import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from 'bcrypt';
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from 'jsonwebtoken'
import APP_CONSTANTS from "../constants";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import { Address } from "../entities/Address";
import { UpdateAddressDto } from "../dto/UpdateAddress";

export class EmployeeService{

    constructor(private employeeRepo: EmployeeRespository){
       
    }
    async getAllEmployees(){
        const employeeResp = await this.employeeRepo.getAllEmployees();
        return employeeResp;
    }
    // async createEmployee(employee: ObjectLiteral){
    //    return await this.employeeRepo.createEmployee(employee)
    // }

    public async createEmployee(employeeDetails: CreateEmployeeDto) {
        try {
            if (employeeDetails.address){
                var newEmployee: Employee = plainToClass(Employee, {
                    name: employeeDetails.name,
                    password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                    departmentId: employeeDetails.departmentId,
                    email: employeeDetails.email,
                    role: employeeDetails.role,
                    status: employeeDetails.status,
                    addressZipCode: employeeDetails.addressZipCode,
                    address:{
                        city: employeeDetails.address.city,
                        district: employeeDetails.address.district,
                        state: employeeDetails.address.state,
                        zipCode: employeeDetails.address.zipCode
                    },
                    experience: employeeDetails.experience,
                    joiningDate: employeeDetails.joiningDate
                });
            } else {
                var newEmployee: Employee = plainToClass(Employee, {
                    name: employeeDetails.name,
                    password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                    departmentId: employeeDetails.departmentId,
                    email: employeeDetails.email,
                    role: employeeDetails.role,
                    status: employeeDetails.status,
                    addressZipCode: employeeDetails.addressZipCode,
                    experience: employeeDetails.experience,
                    joiningDate: employeeDetails.joiningDate
                });
            }
            console.log(newEmployee)
            const save = await this.employeeRepo.createEmployee(newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee");
        }
    }

    async updateAddress(id: string, address: UpdateAddressDto){
      const employeeDetails = await this.employeeRepo.getEmployeeById(id);
        if (!employeeDetails) {
          throw new EntityNotFoundException(ErrorCodes.USER_NOT_FOUND);
        }
        const newAddress: Address = plainToClass(Address, {
          zipCode: address.zipCode,
          city: address.city,
          district: address.district,
          state:address.state
      });
        return await this.employeeRepo.updateAddress(employeeDetails.addressZipCode, newAddress)
    }

    async getEmployeeById(id: string){
        const employeeResp =  await this.employeeRepo.getEmployeeById(id);
        if(!employeeResp) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
        }
        return employeeResp
    }
    async updateEmployee(id:string, updateEmp: UpdateEmployeeDto){
      const employeeResp =  await this.employeeRepo.getEmployeeById(id);
        if(!employeeResp) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
        }
      const newEmployee: Employee = plainToClass(Employee, {
        name: updateEmp.name,
        password: updateEmp.password ?  await bcrypt.hash(updateEmp.password, 10): '',
        departmentId: updateEmp.departmentId,
        email: updateEmp.email,
        role: updateEmp.role,
        status: updateEmp.status,
        addressZipCode: updateEmp.addressZipCode,
        experience: updateEmp.experience,
        joiningDate: updateEmp.joiningDate
    });
        return await this.employeeRepo.updateEmployee(id, newEmployee);
    }
    async deleteEmployee(id: string){
      const employeeResp =  await this.employeeRepo.getEmployeeById(id);
        if(!employeeResp) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
        }
        const deleteResp = await this.employeeRepo.deleteEmployee(id);
        return deleteResp;
    }

    public employeeLogin = async (name: string, password: string) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(name);
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role": employeeDetails.role
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };
    
}