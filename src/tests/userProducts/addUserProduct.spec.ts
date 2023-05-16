import request from 'supertest'
import app from '../../app'

describe('POST /api/usuario/productos', () => {
  describe('Correct responses', () => {
    test('should response with status 201', async () => {
      const loginData = await request(app)
        .post('/api/auth/login')
        .send({
          correo: 'ramon.hernandez5086@alumnos.udg.mx',
          contraseña: 'RAHA1223'
        })
      const token: string = loginData.body.token

      const response = await request(app)
        .post('/api/usuario/productos')
        .send({
          nombre: 'Duritos',
          descripcion: 'Duritos de papa y harina',
          precio: 10,
          imgUrl: 'Some img url',
          idUsuario: '6430a010fab0796bb139b876',
          idCategoria: '6431d5c22afabdcef42708d2'
        })
        .set({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      expect(response.statusCode).toBe(201)
    })
  })
})
