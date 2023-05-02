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

### User Products
**The path '/api/usuario/' receives a token in the request headers, which is provided by the API during login."**

* "/api/usuario/productos": GET and POST their products if the user's token is valid (method: GET, POST, DELETE, PUT)

## Libraries used
* Express
* bcrypt
* jsonwebtoken
* mongoose
* cors
* dotenv

### To do
* Modularize code to make it cleaner
* Write unit tests
* Implement Web Socket to online chat.
* Validar correos
* Recuperar contraseña +
* Reestablecer contraseña +
* Get user info by id +
* Update user info by id +
* Delete user by id +
* Get categories +