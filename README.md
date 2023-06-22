# CucStore-API
**API from mobile app to Centro Universitario De la costa UDG.**

_We're still working on the API._

## Routes

### Auth
* "/api/auth/register": Register the user (method: POST only)
* "/api/auth/login": Authorizes the user to use the app (method: POST only)

### Products
* "/api/productos": Get all products from all users (method: GET only)
* "/api/productos/:nombre": Get all products that match with the parameter ":nombre" (method: GET only)

**The path '/api/usuario/' receives a token in the request headers, which is provided during login by the API ."**

## User
* "/api/usuario": Get user info in request body using POST method, update user info and delete user (method: POST, DELETE, PUT)

### User Products
* "/api/usuario/productos": Handle user products if the user's token is valid (method: GET, POST, DELETE, PUT)

## Libraries used
* express
* bcrypt
* jsonwebtoken
* mongoose
* cors
* dotenv
* socket.io

### To do
* Modularize code to make it cleaner 🕙
* Write unit tests 🕙
* Implement Web Socket to online chat. 🕙
* Validate mails 🕙
* Recover password 🕙
* Restore password ✅
* Show active user products ✅
* Upload to domain ✅
* Add product search by character 🕙

