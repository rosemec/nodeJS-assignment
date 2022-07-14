import { IsNumber, IsString } from "class-validator";


export class UpdateAddressDto{
    @IsString()
    public zipCode: string;

    @IsString()
    public city: string;

    @IsString()
    public district: string;

    @IsString()
    public state: string

}