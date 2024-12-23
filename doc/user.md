# User api spec

## Register User
Endpoint : POST /api/users

Request Body : 

```json
{
   "username" : "irfandi",
   "password" : "secret",
   "name" : "Ego Irfandi"
}
```

Response Body (success) : 
```json
{
   "data" : {
      "username" : "irfandi",
      "name" : "Ego Irfandi"
   }
}
```

Response Body (Error) : 

```json
{
   "errors" : "Username error...."
}
```

## Login User
Endpoint : POST /api/users/login

Request body : 
```json
{
   "username" : "irfandi",
   "password" : "secret"
}
```

Response Body (success) : 
```json
{
   "data" : {
      "username" : "irfandi",
      "name" : "Ego Irfandi",
      "token" : "jwt"
   }
}
```
## Get User

Endpoint : GET /api/users/current

Request Header :
- Authorization : Header


Response Body (success) : 
```json
{
   "data" : {
      "username" : "irfandi",
      "name" : "Ego Irfandi",
      "token" : "jwt"
   }
}
```
## update User
Endpoint : PATCH /api/users/current

Request Header :
- Authorization : Header

Request Body
```json
{
   "name" : "ego",
   "password" : "new",
}
```
## Logout User

Request Header :
- Authorization : Header

Endpoint : DELETE /api/users/current
```json
{
   data: "success"
}
```

