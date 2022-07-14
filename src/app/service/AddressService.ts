import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { CreateAddressDto } from "../dto/CreateAddress";
import { Address } from "../entities/Address";
import { AddressRespository } from "../repository/AddressRepository";

export default class AddressService {
    constructor(private addressRepo: AddressRespository) {

    }
    async getAddress(){
        const addressResp = this.addressRepo.getAddress()
        return addressResp;
    }
    async createAddress(address: CreateAddressDto){
        const newAddress: Address = plainToClass(Address,{
            zipCode:address.zipCode,
            city:address.city,
            state:address.state,
            district:address.district
        })
        return await this.addressRepo.createAddress(newAddress)
    }
}