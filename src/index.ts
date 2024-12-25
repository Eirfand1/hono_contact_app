import { Hono } from 'hono'
import { userController } from './controller/UserController'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'
import { contactController } from './controller/ContactController'
import { addressController } from './controller/AddressController'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', userController)
app.route('/', contactController)
app.route('/', addressController)

app.onError(async (error, c) => {
  if (error instanceof HTTPException) {
    c.status(error.status)
    return c.json({
      errors: error.message
    })
  } else if (error instanceof ZodError) {
    c.status(400)
    return c.json({
      errors: error.message
    })
  } else {
    c.status(500)
    return c.json({
      errors: error.message
    })

  }
})
export default app
