import { expect, describe, it, beforeEach, afterEach } from "bun:test"
import { ContactTest, UserTest } from "./test.util"
import app from "../src"

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should rejected if contact is invalid', async () => {
    const response = await app.request('/api/contacts', {
      method: 'post',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        first_name: "",
      })
    })

    expect(response.status).toBe(400)

    const body = await response.json()
    expect(body.errors).toBeDefined()

  })

  it('should rejected if token is invalid', async () => {
    const response = await app.request('/api/contacts', {
      method: 'post',
      headers: {
        'Authorization': 'salah'
      },
      body: JSON.stringify({
        first_name: "",
      })
    })

    expect(response.status).toBe(401)

    const body = await response.json()
    expect(body.errors).toBeDefined()

  })

  it('should success if contact is valid (only first_name)', async () => {
    const response = await app.request('/api/contacts', {
      method: 'post',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        first_name: "Ego",
      })
    })

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body.data).toBeDefined()
    expect(body.data.first_name).toBe("Ego")
    expect(body.data.last_name).toBeNull()
    expect(body.data.email).toBeNull()
    expect(body.data.phone).toBeNull()
  })

  it('should success if contact is valid (full data)', async () => {
    const response = await app.request('/api/contacts', {
      method: 'post',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        first_name: "Ego",
        last_name: "Irfandi",
        email: "name.fandi07@proton.me",
        phone: "628992040913"
      })
    })

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body.data).toBeDefined()
    expect(body.data.first_name).toBe("Ego")
    expect(body.data.last_name).toBe("Irfandi")
    expect(body.data.email).toBe("name.fandi07@proton.me")
    expect(body.data.phone).toBe("628992040913")
  })

})

describe("GET /api/contacts/{id}", () => {
  beforeEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should get 404 if contact is not found', async () => {
    // const contact = await ContactTest.get()

    const response = await app.request('/api/contacts/' + 'c4a31796-72eb-4004-8889-6067ced953fd', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      },
    })

    expect(response.status).toBe(404)

    const body = await response.json()
    expect(body.errors).toBeDefined()
  })

  it('should success if contact is exist ', async () => {
    const contact = await ContactTest.get()

    const response = await app.request('/api/contacts/' + contact.id, {
      method: 'get',
      headers: {
        'Authorization': 'test'
      },
    })

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body.data).toBeDefined()
    expect(body.data.first_name).toBe(contact.first_name)
    expect(body.data.last_name).toBe(contact.last_name)
    expect(body.data.email).toBe(contact.email)
    expect(body.data.phone).toBe(contact.phone)
    expect(body.data.id).toBe(contact.id)

  })
})

describe('PUT /api/contacts/{id}', async () => {
  beforeEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should rejected update contacts if request invalid', async () => {
    const contact = await ContactTest.get()
    const response = await app.request('/api/contacts/' + contact.id, {
      method: 'put',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        first_name: ""
      })
    })

    expect(response.status).toBe(400)

    const body = await response.json()
    expect(body.errors).toBeDefined()

  })

  it('should  update contacts if request valid', async () => {
    const contact = await ContactTest.get()
    const response = await app.request('/api/contacts/' + contact.id, {
      method: 'put',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        first_name: "Ego",
        last_name: "Irfandi",
        email: "name.fandi07@proton.me",
        phone: "08992040913"
      })
    })

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body.data).toBeDefined()
    expect(body.data.first_name).toBe("Ego")
    expect(body.data.last_name).toBe("Irfandi")
    expect(body.data.email).toBe("name.fandi07@proton.me")
    expect(body.data.phone).toBe("08992040913")
  })

  it('should rejected update contacts if id is not found', async () => {
    const response = await app.request('/api/contacts/' + 'c4a31796-72eb-4004-8889-6067ced953fd', {
      method: 'put',
      headers: {
        'Authorization': 'test'
      },
      body: JSON.stringify({
        first_name: "Ego"
      })
    })

    expect(response.status).toBe(404)

    const body = await response.json()
    expect(body.errors).toBeDefined()
  })

})

describe('DELETE /api/contacts/{id}', async () => {
  beforeEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should rejected if contact id not found', async () => {
    const response = await app.request('/api/contacts/' + 'c4a31796-72eb-4004-8889-6067ced953fd', {
      method: 'delete',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(404)

    const body = await response.json()
    expect(body.errors).toBeDefined()
  })

  it('should success if contact is exist', async () => {
    const contact = await ContactTest.get()

    const response = await app.request('/api/contacts/' + contact.id, {
      method: 'delete',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body.data).toBe(true)
  })
})

describe('GET /api/contacts', async () => {
  beforeEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.create()
    await ContactTest.createMany(25)
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should be able to search contact', async () => {
    const response = await app.request('/api/contacts', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)

    const body = await response.json()
    expect(body.data.length).toBe(10)
    expect(body.paging.current_page).toBe(1)
    expect(body.paging.size).toBe(10)
    expect(body.paging.total_page).toBe(3)

  })

  it('should be able to search contact using name', async () => {
    let response = await app.request('/api/contacts?name=Tes', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)

    let body = await response.json()
    expect(body.data.length).toBe(10)
    expect(body.paging.current_page).toBe(1)
    expect(body.paging.size).toBe(10)
    expect(body.paging.total_page).toBe(3)

    response = await app.request('/api/contacts?name=Ses', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)

    body = await response.json()
    expect(body.data.length).toBe(10)
    expect(body.paging.current_page).toBe(1)
    expect(body.paging.size).toBe(10)
    expect(body.paging.total_page).toBe(3)


  })

  it('should be able to search contact using email', async () => {
    const response = await app.request('/api/contacts?email=test', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)

    let body = await response.json()
    expect(body.data.length).toBe(10)
    expect(body.paging.current_page).toBe(1)
    expect(body.paging.size).toBe(10)
    expect(body.paging.total_page).toBe(3)

  })

  it('should be able to search contact using phone', async () => {
    const response = await app.request('/api/contacts?phone=test', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)

    let body = await response.json()
    expect(body.data.length).toBe(10)
    expect(body.paging.current_page).toBe(1)
    expect(body.paging.size).toBe(10)
    expect(body.paging.total_page).toBe(3)

  })


  it('should be able to search without result', async () => {
    let response = await app.request('/api/contacts?name=jatim', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)

    let body = await response.json()
    expect(body.data.length).toBe(0)
    expect(body.paging.current_page).toBe(1)
    expect(body.paging.size).toBe(10)
    expect(body.paging.total_page).toBe(0)

    response = await app.request('/api/contacts?email=cbcbcb', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)

    body = await response.json()
    expect(body.data.length).toBe(0)
    expect(body.paging.current_page).toBe(1)
    expect(body.paging.size).toBe(10)
    expect(body.paging.total_page).toBe(0)

    response = await app.request('/api/contacts?phone=horeg', {
      method: 'get',
      headers: {
        'Authorization': 'test'
      }
    })

    expect(response.status).toBe(200)

    body = await response.json()
    expect(body.data.length).toBe(0)
    expect(body.paging.current_page).toBe(1)
    expect(body.paging.size).toBe(10)
    expect(body.paging.total_page).toBe(0)

  })

  it('should be able to search with paging', async () => {
    it('should be able to search contact', async () => {
      let response = await app.request('/api/contacts?size=5', {
        method: 'get',
        headers: {
          'Authorization': 'test'
        }
      })

      expect(response.status).toBe(200)

      let body = await response.json()
      expect(body.data.length).toBe(5)
      expect(body.paging.current_page).toBe(1)
      expect(body.paging.size).toBe(5)
      expect(body.paging.total_page).toBe(5)


      response = await app.request('/api/contacts?size=5&page=2', {
        method: 'get',
        headers: {
          'Authorization': 'test'
        }
      })

      expect(response.status).toBe(200)

      body = await response.json()
      expect(body.data.length).toBe(5)
      expect(body.paging.current_page).toBe(2)
      expect(body.paging.size).toBe(5)
      expect(body.paging.total_page).toBe(5)


      response = await app.request('/api/contacts?size=5&page=100', {
        method: 'get',
        headers: {
          'Authorization': 'test'
        }
      })

      expect(response.status).toBe(200)

      body = await response.json()
      expect(body.data.length).toBe(0)
      expect(body.paging.current_page).toBe(2)
      expect(body.paging.size).toBe(5)
      expect(body.paging.total_page).toBe(5)

    })

  })
})











