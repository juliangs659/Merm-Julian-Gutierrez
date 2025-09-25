const request = require('supertest');
const app = require('../app');

describe('Prueba de salud', () => {
  test('GET /api/health debe devolver ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
  });
});
