import { describe, it, expect, afterEach, beforeEach } from "bun:test"
import app from "../src"
import { logger } from "../src/application/logging"
import { UserTest } from "./test.util"

describe('POST /api/users', () => {

   afterEach(async () => {
      await UserTest.delete()
   })

   it("should reject if request is invalid", async () => {
      const response = await app.request('/api/users', {
         method: 'post',
         body: JSON.stringify({
            username: "",
            password: "",
            name: ""
         })
      })

      const body = await response.json()
      logger.debug(body)

      expect(response.status).toBe(400)
      expect(body.errors).toBeDefined()
   })

   it("should reject if username already exist", async () => {
      await UserTest.create();

      const response = await app.request('/api/users', {
         method: 'post',
         body: JSON.stringify({
            username: "",
            password: "",
            name: ""
         })
      })

      const body = await response.json()
      logger.debug(body)

      expect(response.status).toBe(400)
      expect(body.errors).toBeDefined()

   })

   it("should register new user success", async () => {
      const response = await app.request('/api/users', {
         method: 'post',
         body: JSON.stringify({
            username: "test",
            password: "test",
            name: "test"
         })
      })

      const body = await response.json()
      logger.debug(body)

      expect(response.status).toBe(200)
      expect(body.data).toBeDefined()
      expect(body.data.username).toBe("test")
      expect(body.data.name).toBe("test")
   })
})

describe('POST /api/users/login', () => {

   beforeEach(async () => {
      await UserTest.create()
   })

   afterEach(async () => {
      await UserTest.delete()
   })

   it("should be able to login", async () => {
      const response = await app.request('/api/users/login', {
         method: 'post',
         body: JSON.stringify({
            username: "test",
            password: "test"
         })
      })

      expect(response.status).toBe(200)

      const body = await response.json()
      expect(body.data.token).toBeDefined()
   })

   it("should be rejected if username is wrong", async () => {
      const response = await app.request('/api/users/login', {
         method: 'post',
         body: JSON.stringify({
            username: "gagl",
            password: "test"
         })
      })

      expect(response.status).toBe(401)

      const body = await response.json()
      expect(body.errors).toBeDefined()
   })

   it("should be rejected if password is wrong", async () => {
      const response = await app.request('/api/users/login', {
         method: 'post',
         body: JSON.stringify({
            username: "test",
            password: "gagal"
         })
      })

      expect(response.status).toBe(401)

      const body = await response.json()
      expect(body.errors).toBeDefined()
   })
})

describe('GET /api/users/current', () => {

   beforeEach(async () => {
      await UserTest.create()
   })

   afterEach(async () => {
      await UserTest.delete()
   })

   it('should be able to get users', async () => {
      const response = await app.request('/api/users/current', {
         method: 'get',
         headers: {
            'Authorization': 'test'
         }
      })

      expect(response.status).toBe(200)

      const body = await response.json()
      expect(body.data).toBeDefined()
      expect(body.data.username).toBeDefined()
      expect(body.data.name).toBeDefined()
   })

   it('should not be able to get users if token invalid', async () => {
      const response = await app.request('/api/users/current', {
         method: 'get',
         headers: {
            'Authorization': 'salah'
         }
      })

      expect(response.status).toBe(401)

      const body = await response.json()
      expect(body.errors).toBeDefined()

   })

   it('should not be able to get users if thereis no Authorizaion header', async () => {
      const response = await app.request('/api/users/current', {
         method: 'get',
      })

      expect(response.status).toBe(401)

      const body = await response.json()
      expect(body.errors).toBeDefined()

   })
})



