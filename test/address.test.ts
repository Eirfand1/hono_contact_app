import { expect, describe, it, beforeEach, afterEach } from "bun:test"
import { AddressTest, ContactTest, UserTest } from "./test.util"
import app from "../src"

describe('POST /api/contacts/{id}/addresses', () => {
  beforeEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should rejected if request is not valid', async () => {
    const contact = await ContactTest.get()
    const response = await app.request('/api/contacts/' + contact.id + '/addresses', {
      method: 'post',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        country: "",
        postal_code: ""
      })
    })

    expect(response.status).toBe(400)

    const body = await response.json()
    expect(body.errors).toBeDefined()

  })

  it('should rejected if contact is not found', async () => {
    // const contact = await ContactTest.get()
    const response = await app.request('/api/contacts/' + '497dd738-6173-46e1-b3a6-2eb870df8666' + '/addresses', {
      method: 'post',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        country: "indonesia",
        postal_code: "12313"
      })
    })

    expect(response.status).toBe(404)

    const body = await response.json()
    expect(body.errors).toBeDefined()

  })

  it('should success if request is valid', async () => {
    const contact = await ContactTest.get()
    const response = await app.request('/api/contacts/' + contact.id + '/addresses', {
      method: 'post',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        street: "jalan",
        city: "cilacap",
        province: "Provinci",
        country: "indonesia",
        postal_code: "12345"
      })
    })

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body.data).toBeDefined()
    expect(body.data.street).toBe("jalan")
    expect(body.data.city).toBe("cilacap")
    expect(body.data.province).toBe("Provinci")
    expect(body.data.country).toBe("indonesia")
    expect(body.data.postal_code).toBe("12345")

  })
})

describe("GET /api/contacts/{contactId}/addresses/{addressId}", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
    await UserTest.create()
    await ContactTest.create()

    await AddressTest.create()
  })

  afterEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should rejected if address is not found', async () => {
    const contact = await ContactTest.get()
    // const address = await AddressTest.get()
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + '8a62201a-6e02-418d-9ca8-3079d722a193', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(404)
    const body = await response.json()
    expect(body.errors).toBeDefined()

  })

  it('should rejected if address is not found', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + address.id, {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.data).toBeDefined()
    expect(body.data.id).toBe(address.id)
    expect(body.data.street).toBe(address.street)
    expect(body.data.city).toBe(address.city)
    expect(body.data.province).toBe(address.province)
    expect(body.data.country).toBe(address.country)
    expect(body.data.postal_code).toBe(address.postal_code)
  })

})


describe("PUT /api/contacts/{contactId}/addresses/{addressId}", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
    await UserTest.create()
    await ContactTest.create()

    await AddressTest.create()
  })

  afterEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should rejected ifrequest is invalid', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + address.id, {
      method: 'put',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        country: "",
        postal_code: "",

      })
    })

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.errors).toBeDefined()

  })

  it('should rejected if address is not found', async () => {
    const contact = await ContactTest.get()
    // const address = await AddressTest.get()
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + '86eeec7c-b972-4619-8462-3af745cec82f', {
      method: 'put',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        country: "Indonesia",
        postal_code: "12345",

      })
    })

    expect(response.status).toBe(404)
    const body = await response.json()
    expect(body.errors).toBeDefined()

  })

  it('should success if address is valid', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + address.id, {
      method: 'put',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        street: "A",
        city: "B",
        province: "C",
        country: "Singapore",
        postal_code: "9999",

      })
    })

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.data).toBeDefined()
    expect(body.data.id).toBe(address.id)
    expect(body.data.street).toBe("A")
    expect(body.data.city).toBe("B")
    expect(body.data.province).toBe("C")
    expect(body.data.country).toBe("Singapore")
    expect(body.data.postal_code).toBe("9999")

  })
})


describe("DELETE /api/contacts/{contactId}/addresses/{addressId}", () => {
  beforeEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
    await UserTest.create()
    await ContactTest.create()

    await AddressTest.create()
  })

  afterEach(async () => {
    await AddressTest.deleteAll()
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should rejected if address not exist', async () => {
    const contact = await ContactTest.get()
    // const address = await AddressTest.get()
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + '7e466fd3-07c9-400d-9634-6534e4bbc8e8', {
      method: 'delete',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(404)
    const body = await response.json()
    expect(body.errors).toBeDefined()

  })

  it('should success if address is exist', async () => {
    const contact = await ContactTest.get()
    const address = await AddressTest.get()
    const response = await app.request('/api/contacts/' + contact.id + '/addresses/' + address.id, {
      method: 'delete',
      headers: {
        'Authorization': 'test'
      }
    })

    // console.info("MASUK : ${JSON.stringify(request)} ")
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.data).toBeTrue()
  })

})




