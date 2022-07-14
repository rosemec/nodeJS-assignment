import { ObjectLiteral } from "typeorm";
import { AddressRespository } from "../repository/AddressRepository";

export default class AddressService {
    constructor(private addressRepo: AddressRespository) {

    }
    async getAddress(){
        const addressResp = this.addressRepo.getAddress()
        return addressResp;
    }
    async createAddress(address: ObjectLiteral){
        return await this.addressRepo.createAddress(address)
    }
}