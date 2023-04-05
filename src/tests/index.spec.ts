import app from '../app'
import request from 'supertest'

describe('GET  /', () => {
  test('should respond with state code 200 and a "Hola, Mundo" ', async () => {
    const response = await request(app).get('/').send()
    console.log(response)
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('Hola, Mundo')
  })
})
