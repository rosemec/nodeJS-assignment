import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS, { Role } from "../constants";
import AddressService from "../service/AddressService";
import authorize from "../middleware/authorizationMiddleware";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateAddressDto } from "../dto/CreateAddress";

class AddressController extends AbstractController {
  constructor(private addressService: AddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/address`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize([Role.ADMIN, Role.ENGINEER, Role.HR, Role.MANAGER]), this.getAddress);
    this.router.post(`${this.path}`, authorize([Role.ADMIN,Role.HR]), validationMiddleware(CreateAddressDto, APP_CONSTANTS.body), this.createAddress);
  }
  private getAddress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "List of addresses"};
      response.send(await this.addressService.getAddress());
      //response.send(data)
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
  private createAddress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Address created"};
      const address : CreateAddressDto = request.body
      response.send(await this.addressService.createAddress(address));
      //response.send(data)
      response.status(200);
    } catch (error) {
      return next(error);
    }
  }
}

export default AddressController;