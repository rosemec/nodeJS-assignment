
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class PatchUpdateEmployeeDto{
    @IsString()
    @IsOptional()
    public name: string;

    @IsString()
    @IsOptional()
    public joiningDate: string;

    @IsString()
    @IsOptional()
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
    @IsOptional()
    public address: string

    @IsOptional()
    @IsString()
    public password?: string

    @IsOptional()
    @IsString()
    public empId: string
}