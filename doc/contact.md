# Contact API Spec

## Create Contact

Endpoint: POST /api/contact

Request Header :
- Authorization : Header

Request Body : 
```json
{
   "first_name" : "Nama Depan",
   "last_name" : "Nama belakang",
   "email" : "name@gmaul.com",
   "phone" : "089696969669",
}
```

Response Body :

```json
{
   "data" : {
      "id" : 1,
      "first_name" : "Nama Depan",
      "last_name" : "Nama belakang",
      "email" : "name@gmaul.com",
      "phone" : "089696969669",

   }
}
```

Request Body

## Get Contact

Request Header :
- Authorization : Header

Endpoint : GET /api/contact/{idContact}

Response Body
```json
{
   "data" : {
      "id" : 1,
      "first_name" : "Nama Depan",
      "last_name" : "Nama belakang",
      "email" : "name@gmaul.com",
      "phone" : "089696969669",

   }
}

```

## Update Contact

Endpoint : PUT /api/contact/{idContact}

Request Body :

```json
{
   "first_name" : "Nama Depan",
   "last_name" : "Nama belakang",
   "email" : "name@gmaul.com",
   "phone" : "089696969669",
}
```

Response Body : 

```json
{
   "data" : {
      "id" : 1,
      "first_name" : "Nama Depan",
      "last_name" : "Nama belakang",
      "email" : "name@gmaul.com",
      "phone" : "089696969669",

   }
}

```

Request Header :
- Authorization : Header

## Remove Contact

Endpoint : DELETE /api/contact/{idContact}

Request Header :
- Authorization : Header

```json
{
   "data" : true
}
```

## Search Contact

Request Header :
- Authorization : Header

Request Body :
Endpoint : GET /api/contacts

Query Params :
- name : string, seatch firstname/last_name
- email : search email
- phone : search phone number
- page: number, default 1
- size : number, default 10

Response Body : 
```json 
{
   "data" : [
      {
         "id" : 1,
         "first_name" : "Nama Depan",
         "last_name" : "Nama belakang",
         "email" : "name@gmaul.com",
         "phone" : "089696969669",
      },
      {
         "id" : 2,
         "first_name" : "Nama Depan",
         "last_name" : "Nama belakang",
         "email" : "name@gmaul.com",
         "phone" : "089696969669",
      },
   ],
   "paging" : {
      "current_page" : 1,
      "total_page" : 10,
      "size" : 10
   }
}
```
