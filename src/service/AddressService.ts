import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, toAddressResponse, UpdateAddressRequest } from "../model/Address";
import { AddressValidation } from "../validation/AddressValidation";
import { ContactService } from "./ContactService";
import { prismaClient } from "../application/database";
import { add } from "winston";
import { HTTPException } from "hono/http-exception";

export class AddressService {
  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    request = AddressValidation.CREATE.parse(request)
    await ContactService.contactMustExist(user, request.contact_id)

    const address = await prismaClient.address.create({
      data: request
    })

    return toAddressResponse(address)
  }

  static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    request = AddressValidation.GET.parse(request)

    await ContactService.contactMustExist(user, request.contact_id)

    const address = await this.addressMustExist(request.contact_id, request.id)

    return toAddressResponse(address)

  }

  static async addressMustExist(contactId: string, addressId: string): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        contact_id: contactId,
        id: addressId
      }
    })

    if (!address) {
      throw new HTTPException(404, {
        message: "Addres is not found"
      })
    }

    return address
  }

  static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
    request = AddressValidation.UPDATE.parse(request)

    await ContactService.contactMustExist(user, request.contact_id)
    await this.addressMustExist(request.contact_id, request.id)

    const address = await prismaClient.address.update({
      where: {
        id: request.id,
        contact_id: request.contact_id
      },
      data: request
    })

    return toAddressResponse(address)
  }

  static async remove(user: User, request: RemoveAddressRequest): Promise<boolean> {
    request = AddressValidation.REMOVE.parse(request)

    await ContactService.contactMustExist(user, request.contact_id)
    await this.addressMustExist(request.contact_id, request.id)

    await prismaClient.address.delete({
      where: {
        id: request.id,
        contact_id: request.contact_id
      }
    })

    return true

  }


}
