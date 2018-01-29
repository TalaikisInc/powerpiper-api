import * as request from 'supertest'
import * as app from '../src'

describe('GET /api/blog/posts/0', () => {
  it('should return 200 OK', () => {
    return request(app).get('/api/blog/posts/0')
      .expect(200)
  })
})
