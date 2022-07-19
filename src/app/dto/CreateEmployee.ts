import { Type } from "class-transformer";
import { Allow, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddress";
import { CreateDepartmentDto } from "./CreateDepartment";


export class CreateEmployeeDto{
    @IsString()
    public name: string;

    @IsString()
    public joiningDate: string;

    @IsString()
    public email: string;

    // @IsOptional()
    // @IsString()
    // public departmentId: string

    @IsOptional()
    @IsString()
    public role?: string

    @IsOptional()
    @IsString()
    public status?: string

    @IsOptional()
    @IsString()
    public experience?: string

    @IsString()
    public address: string

    @IsOptional()
    @IsString()
    public password?: string

    @IsString()
    public empId: string


    // @ValidateNested({each: true})
    // @Type(()=>CreateAddressDto)
    // public address?: CreateAddressDto

    // @ValidateNested({each: true})
    // @Type(()=>CreateDepartmentDto)
    // public department?: CreateDepartmentDto
}