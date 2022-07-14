import { getConnection, ObjectLiteral } from "typeorm";
import { Address } from "../entities/Address";

export class AddressRespository{
    async getAddress(){
         const addressRepo = getConnection().getRepository(Address);
        return addressRepo.find();
    }
    async createAddress(address: ObjectLiteral){
        const addressRepo = getConnection().getRepository(Address);
        return await addressRepo.save(address);
    }
    }