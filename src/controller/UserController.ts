import { Hono } from "hono";
import { LoginUserRequest, RegisterUserRequest, toUserResponse, UpdateUserRequest } from "../model/User";
import { UserService } from "../service/UserService";
import { User } from "@prisma/client";
import { AppicationVariable } from "../model/App";
import { authMiddleware } from "../middleware/AuthMiddleware";

export const userController = new Hono<{ Variables: AppicationVariable }>();

userController.post('/api/users', async (c) => {
   const request = await c.req.json() as RegisterUserRequest

   // kirim ke service
   const response = await UserService.register(request)

   // return service
   return c.json({
      data: response
   })
})

userController.post('/api/users/login', async (c) => {
   const request = await c.req.json() as LoginUserRequest
   // kirim ke service
   const response = await UserService.login(request)

   // return service
   return c.json({
      data: response
   })
})


userController.use(authMiddleware)

userController.get('/api/users/current', async (c) => {
   // ambil user 

   const user = c.get('user') as User

   return c.json({
      data: toUserResponse(user)
   })
})

userController.patch('/api/users/current', async (c) => {
   const user = c.get('user') as User
   const request = await c.req.json() as UpdateUserRequest

   const response = await UserService.update(user, request)

   return c.json({
      data: response
   })

})

userController.delete('/api/users/current', async (c) => {
   const user = c.get('user') as User

   const response = await UserService.logout(user)

   return c.json({
      data: response
   })

})



