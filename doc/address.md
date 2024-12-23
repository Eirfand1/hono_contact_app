# address api spec

## create address
Endpoint : POST /api/contacts/{idContact}/address

request header: 
- Authorizatoin: token

request body :

```json

{
   "street" : "jalan",
   "city": "cilacap",
   "province" : "jawa",
   "country" : "indo",
   "postal_code" : "121212",
}

```

Response body

```json
{
   "data" : {
      "id" : 1,
      "street" : "jalan",
      "city": "cilacap",
      "province" : "jawa",
      "country" : "indo",
      "postal_code" : "121212",

   }
}
```


## get address

Endpoint : GET /api/contacts/{idContact}/address/{idAddress}

request header: 
- Authorizatoin: token


Response Body : 
```json
{
   "data" : {
      "id" : 1,
      "street" : "jalan",
      "city": "cilacap",
      "province" : "jawa",
      "country" : "indo",
      "postal_code" : "121212",

   }
}
```


## Update address

Endpoint : PUT /api/contacts/{idContact}/address/{idAddress}

request header: 
- Authorizatoin: token

Request Body : 
```json
{
   "street" : "jalan",
   "city": "cilacap",
   "province" : "jawa",
   "country" : "indo",
   "postal_code" : "121212",
}

```
Response Body : 
```json
{
   "data" : {
      "id" : 1,
      "street" : "jalan",
      "city": "cilacap",
      "province" : "jawa",
      "country" : "indo",
      "postal_code" : "121212",

   }
}
```


## Remove address

Endpoint : DELETE /api/contacts/{idContact}/address/{idAddress}

request header: 
- Authorizatoin: token

Response Body : 

```json
{
   "data" : true
}
```


## list address

Endpoint : /api/contacts/{idContact}/address

request header: 
- Authorizatoin: token

Response Body : 
```json
{
   "data" : [
      {
         "id" : 1,
         "street" : "jalan",
         "city": "cilacap",
         "province" : "jawa",
         "country" : "indo",
         "postal_code" : "121212",

      },
      {
         "id" : 2, 
         "street" : "jalan",
         "city": "cilacap",
         "province" : "jawa",
         "country" : "indo",
         "postal_code" : "121212",

      }
   ],
}

```


