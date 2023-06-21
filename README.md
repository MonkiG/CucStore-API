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

**The path '/api/usuario/' receives a token in the request headers, which is provided by the API during login."**

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
* Modularize code to make it cleaner
* Write unit tests
* Implement Web Socket to online chat.
* Validar correos
* Recuperar contraseña +
* Reestablecer contraseña +
* Mostrar productos de usuarios activos
* Subir a dominio
* Agregar busqueda por character
* Permitir solo un inicio de sesion a la vez
