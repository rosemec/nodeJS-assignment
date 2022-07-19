import { Type } from "class-transformer";
import { Allow, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class UpdateEmployeeDto{
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
    public empId : string
}