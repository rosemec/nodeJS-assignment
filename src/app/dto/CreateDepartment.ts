import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";


export class CreateDepartmentDto{
    @IsString()
    public name: string;
}