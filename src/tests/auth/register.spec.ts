import app from '../../app'
import request from 'supertest'

describe('POST /api/auth/register', () => {
  describe('Correct responses', () => {
    test('should respond with status 201', async () => {
      const randomNumber = Math.floor(Math.random() * 1000)
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          correo: `test.jest${randomNumber}@alumnos.udg.mx`,
          contraseña: 'some jest pasword',
          nombres: 'Jest',
          apellidoPaterno: 'Test',
          apellidoMaterno: 'Test 2'
        })
        .set('Content-type', 'application/json')
      expect(response.statusCode).toBe(201)
    })

    test('should respond with status 409', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          correo: 'ramon.hernandez5086@alumnos.udg.mx',
          contraseña: 'RAHA1234',
          nombres: 'Ramón Antonio',
          apellidoPaterno: '"Hernández',
          apellidoMaterno: 'Amaral'
        })
        .set('Content-type', 'application/json')
      expect(response.statusCode).toBe(409)
    })
    test('should respond with status 401', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          correo: 'raan.heam@gmail.com',
          contraseña: 'RAHA1234',
          nombres: 'Ramón Antonio',
          apellidoPaterno: '"Hernández',
          apellidoMaterno: 'Amaral'
        })
        .set('Content-type', 'application/json')
      expect(response.statusCode).toBe(401)
    })
  })

  describe('Wrong responses', () => {
    test('Should respond with status 400', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({})
        .set('Content-type', 'application/json')
      expect(response.statusCode).toBe(400)
    })
  })
})
