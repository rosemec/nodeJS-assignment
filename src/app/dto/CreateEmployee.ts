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

    @IsOptional()
    @IsString()
    public departmentId: string

    @IsOptional()
    @IsString()
    public role?: string

    @IsOptional()
    @IsString()
    public status?: string

    @IsOptional()
    @IsNumber()
    public experience?: number

    @IsString()
    public addressZipCode: string

    @IsOptional()
    @IsString()
    public password?: string

    @ValidateNested({each: true})
    @Type(()=>CreateAddressDto)
    public address?: CreateAddressDto

    @ValidateNested({each: true})
    @Type(()=>CreateDepartmentDto)
    public department?: CreateDepartmentDto
}