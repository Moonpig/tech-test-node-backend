import request from 'supertest'
import { app } from '../server'


test('returns all cards with correct structure', async () => {
  const response = await request(app).get('/cards')

  expect(response.status).toBe(200)
  expect(response.body).toEqual(
  expect.arrayContaining([
    expect.objectContaining({ title: 'card 1 title', url: '/cards/card001' })
  ]))
})
test('returns matching card title', async () => {
  const response = await request(app).get('/cards/card001')

  expect(response.status).toBe(200)
  expect(response.body).toEqual(expect.objectContaining({
    title: 'card 1 title',
  }))
})
