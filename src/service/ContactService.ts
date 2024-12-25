import { HTTPException } from "hono/http-exception";
import { prismaClient } from "../application/database";
import { ContactResponse, CreateContactRequest, SearchContactRequest, toContactResponse, UpdateContactRequest } from "../model/Contact";
import { ContactValidation } from "../validation/ContactValidation";
import { Contact, User } from "@prisma/client";
import { PageAble } from "../model/Page";

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

  static async get(user: User, contactId: string): Promise<ContactResponse> {
    contactId = ContactValidation.GET.parse(contactId)

    const contact = await this.contactMustExist(user, contactId)

    return toContactResponse(contact)
  }

  static async contactMustExist(user: User, contactId: string): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        username: user.username
      }
    })

    if (!contact) {
      throw new HTTPException(404, {
        message: "Contact not found"
      })
    }

    return contact
  }

  static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
    request = ContactValidation.UPDATE.parse(request)
    await this.contactMustExist(user, request.id)

    const contact = await prismaClient.contact.update({
      where: {
        username: user.username,
        id: request.id
      },
      data: request
    })

    return toContactResponse(contact)
  }

  static async delete(user: User, contactId: string): Promise<boolean> {
    contactId = ContactValidation.DELETE.parse(contactId)
    await this.contactMustExist(user, contactId)

    await prismaClient.contact.delete({
      where: {
        username: user.username,
        id: contactId
      }
    })
    return true
  }

  static async search(user: User, request: SearchContactRequest): Promise<PageAble<ContactResponse>> {
    request = ContactValidation.SEARCH.parse(request)

    const filters = []
    if (request.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: request.name
            }
          },
          {
            last_name: {
              contains: request.name
            }
          }
        ]
      })
    }

    if (request.email) {
      filters.push({
        email: {
          contains: request.email
        }
      })
    }

    if (request.phone) {
      filters.push({
        email: {
          contains: request.phone
        }
      })
    }

    const skip = (request.page - 1) * request.size
    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters
      },
      take: request.size,
      skip: skip
    })

    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters
      }
    })

    return {
      data: contacts.map(contact => toContactResponse((contact))),
      paging: {
        current_page: request.page,
        size: request.size,
        total_page: Math.ceil(total / request.size)
      }
    }
  }
}





