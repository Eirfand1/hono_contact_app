import { Hono } from "hono";
import { AppicationVariable } from "../model/App";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { User } from "@prisma/client";
import { CreateAddressRequest } from "../model/Address";
import { AddressService } from "../service/AddressService";

export const addressController = new Hono<{ Variables: AppicationVariable }>();
addressController.use(authMiddleware)

addressController.post('/api/contacts/:id/addresses', async (c) => {
  const user = c.get('user') as User
  const contactId = c.req.param("id")
  const request = await c.req.json() as CreateAddressRequest
  request.contact_id = contactId
  const response = await AddressService.create(user, request)

  return c.json({
    data: response
  })
})





