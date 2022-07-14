import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import AddressService from "../service/AddressService";

class AddressController extends AbstractController {
  constructor(private addressService: AddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/address`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getAddress);
    this.router.post(`${this.path}`, this.createAddress);
  }
  private getAddress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "List of addresses"};
      response.status(200);
      response.send(await this.addressService.getAddress());
      //response.send(data)
    } catch (error) {
      return next(error);
    }
  }
  private createAddress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Address created"};
      response.status(200);
      response.send(await this.addressService.createAddress(request.body));
      //response.send(data)
    } catch (error) {
      return next(error);
    }
  }
}

export default AddressController;