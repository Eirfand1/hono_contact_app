import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, toAddressResponse } from "../model/Address";
import { AddressValidation } from "../validation/AddressValidation";
import { ContactService } from "./ContactService";
import { prismaClient } from "../application/database";

export class AddressService {
  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    request = AddressValidation.CREATE.parse(request)
    await ContactService.contactMustExist(user, request.contact_id)

    const address = await prismaClient.address.create({
      data: request
    })

    return toAddressResponse(address)
  }
}
