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
test('returns 404 if card  not found', async () => {
  const response = await request(app).get('/cards/invalidCard')

  expect(response.status).toBe(404)
  expect(response.body).toEqual(expect.objectContaining({
     "error": "Card not found"
  }))
})

test('returns matching card size', async () => {
  const response = await request(app).get('/cards/card001/sm')

  expect(response.status).toBe(200)
  expect(response.body).toEqual(expect.objectContaining({
    title: 'card 1 title',
     price: "£1.60",
     imageUrl: '/front-cover-portrait-1.jpg'
  }))
})
test('returns 404 if card size not found', async () => {
  const response = await request(app).get('/cards/card001/invalidSize')

  expect(response.status).toBe(404)
  expect(response.body).toEqual(expect.objectContaining({
   "error": "Card size not found"
  }))
})