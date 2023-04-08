import { IUsuarioLogin } from '../../types'
import app from '../../app'
import request from 'supertest'

describe('POST /api/auth/login', () => {
  describe('Correct responses', () => {
    const randomNumber = Math.floor(Math.random() * 100)
    const user1: IUsuarioLogin = {
      correo: 'test.jest5086@alumnos.udg.mx',
      contraseña: 'some jest pasword'
    }
    const user2: IUsuarioLogin = {
      correo: `ramon.hernandez${randomNumber}@alumnos.udg.mx`,
      contraseña: 'RAHA1234'
    }

    test('should respond with status 200 on user1', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(user1)
        .set('Content-Type', 'application/json')
      expect(response.statusCode).toBe(200)
    })

    test('should respond with status token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(user1)
        .set('Content-Type', 'application/json')
      expect(response.body.token).toBeDefined()
    })

    test('should respond with status 404', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(user2)
        .set('Content-Type', 'application/json')
      expect(response.statusCode).toBe(404)
    })

    test('should respond with status 401', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          correo: user1.correo,
          contraseña: 'fasdfas'
        })
        .set('Content-Type', 'application/json')
      expect(response.statusCode).toBe(401)
    })
    test('should respond with status 401', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          correo: user2.correo,
          contraseña: user1.contraseña
        })
        .set('Content-Type', 'application/json')
      expect(response.statusCode).toBe(404)
    })
  })
})
