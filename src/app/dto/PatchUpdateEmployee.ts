
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
    @IsOptional()
    public addressZipCode: string

    @IsOptional()
    @IsString()
    public password?: string
}