# CucStore-API
**API from mobile app to Centro Universitario De la costa UDG.**

_We're still working on the API._

## Routes

### Auth
* "/api/auth/register": Register the user (method: POST only)
* "/api/auth/login": Authorizes the user to use the app (method: POST only)

### Products
* "/api/productos": Get all products from all users (method: GET only)

### User Products
**The path '/api/usuario/' receives a token in the request headers, which is provided by the API during login."**

* "/api/usuario/productos": GET and POST their products if the user's token is valid (method: GET and POST)
* "/api/usuario/productos/:productId": Receives the product ID to be deleted or updated if the user's token is valid (method: delete and put (not implemented yet))

## Libraries used
* Express
* bcrypt
* jsonwebtoken
* mysql2
* dotenv

### To do
* Validate user's Token.
* Implement all the CRUD features.
* Implement Web Socket to online chat.