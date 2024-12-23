import { Hono } from "hono";
import { LoginUserRequest, RegisterUserRequest, toUserResponse } from "../model/User";
import { UserService } from "../service/UserService";
import { User } from "@prisma/client";
import { AppicationVariable } from "../model/App";

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


userController.use(async (c, next) => {
   const token = c.req.header('Authorization')
   const user = await UserService.get(token)

   c.set('user', user)

   await next()
})

userController.get('/api/users/current', async (c) => {
   // ambil user 

   const user = c.get('user') as User

   return c.json({
      data: toUserResponse(user)
   })
})
