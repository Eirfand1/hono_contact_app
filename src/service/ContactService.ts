import { prismaClient } from "../application/database";
import { ContactResponse, CreateContactRequest, toContactResponse } from "../model/Contact";
import { ContactValidation } from "../validation/ContactValidation";
import { User } from "@prisma/client";

export class ContactService {
   static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
      request = ContactValidation.CREATE.parse(request)
      const data = {
         ...request,
         ...{ username: user.username },
      }

      const contact = await prismaClient.contact.create({
         data: data
      })

      return toContactResponse(contact)
   }
}
