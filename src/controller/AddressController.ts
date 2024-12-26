import { Hono } from "hono";
import { AppicationVariable } from "../model/App";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { User } from "@prisma/client";
import { CreateAddressRequest, GetAddressRequest, ListAddressRequest, RemoveAddressRequest, UpdateAddressRequest } from "../model/Address";
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

addressController.get('/api/contacts/:contact_id/addresses/:id', async (c) => {
  const user = c.get('user') as User
  const request: GetAddressRequest = {
    contact_id: c.req.param("contact_id"),
    id: c.req.param("id"),
  }

  const response = await AddressService.get(user, request)

  return c.json({
    data: response
  })
})

addressController.put('/api/contacts/:contact_id/addresses/:address_id', async (c) => {
  const user = c.get('user') as User
  const contactId = c.req.param("contact_id")
  const addressId = c.req.param("address_id")
  const request = await c.req.json() as UpdateAddressRequest

  request.contact_id = contactId
  request.id = addressId
  request.contact_id = contactId
  const response = await AddressService.update(user, request)

  return c.json({
    data: response
  })
})

addressController.delete('/api/contacts/:contact_id/addresses/:address_id', async (c) => {
  const user = c.get('user') as User
  const request: RemoveAddressRequest = {
    id: c.req.param("address_id"),
    contact_id: c.req.param("contact_id")
  }

  const response = await AddressService.remove(user, request)
  return c.json({
    data: response
  })
})

addressController.get('/api/contacts/:contact_id/addresses', async (c) => {
  const user = c.get('user') as User
  const request: ListAddressRequest = {
    contact_id: c.req.param("contact_id")
  }

  const response = await AddressService.list(user, request)
  return c.json({
    data: response
  })
})


