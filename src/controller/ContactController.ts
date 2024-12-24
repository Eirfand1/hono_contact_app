import { Hono } from "hono";
import { AppicationVariable } from "../model/App";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { User } from "@prisma/client";
import { ContactService } from "../service/ContactService";
import { CreateContactRequest } from "../model/Contact";

export const contactController = new Hono<{ Variables: AppicationVariable }>();
contactController.use(authMiddleware)

contactController.post('/api/contacts', async (c) => {
   const user = c.get('user') as User
   const request = await c.req.json() as CreateContactRequest
   const response = await ContactService.create(user, request)

   return c.json({
      data: response
   })
})

