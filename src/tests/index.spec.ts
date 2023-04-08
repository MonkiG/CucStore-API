import app from '../app'
import request from 'supertest'

describe('GET  /', () => {
  test('should respond with state code 200', async () => {
    const response = await request(app).get('/').send()
    expect(response.statusCode).toBe(200)
  })
  test('shoul respond with a text "Hola, Mundo"', async () => {
    const response = await request(app).get('/').send()
    expect(response.text).toBe('Hola, Mundo')
  })
})
