const request = require('supertest');
const app = require('../app');

describe('My List Feature API Tests', () => {
  // Positive Test Cases
  describe('Positive Test Cases', () => {
    test('Adding to My List', async () => {
      const response = await request(app)
        .post('/add')
        .send({ userId: '59b99db7cfa9a34dcd7885bd', itemId: '573a1390f29313caabcd446f', itemType: 'movie' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('userId', 'validUserId');
      expect(response.body).toHaveProperty('itemId', 'validMovieId');
      expect(response.body).toHaveProperty('itemType', 'movie');
    });

    test('Removing from My List', async () => {
      const response = await request(app)
        .post('/remove')
        .send({ userId: '59b99db7cfa9a34dcd7885bd', itemId: '573a1390f29313caabcd446f' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'Item removed from My List successfully' });
    });

    test('Listing My Items', async () => {
      const response = await request(app).get('/list?userId=59b99db7cfa9a34dcd7885bd');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Negative Test Cases
  describe('Negative Test Cases', () => {
    test('Adding to My List - Invalid User', async () => {
      const response = await request(app)
        .post('/add')
        .send({ userId: '59b99db7cfa9a34dcd7885b1d', itemId: '573a1390f29313caabcd446f', itemType: 'movie' });

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    test('Adding to My List - Invalid Movie', async () => {
        const response = await request(app)
          .post('/add')
          .send({ userId: '59b99db7cfa9a34dcd7885bd', itemId: '573a1390f29313caabcd446f1', itemType: 'movie' });
    
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ error: 'Movie not found' });
      });
    
      test('Removing from My List - Non-existent Item', async () => {
        const response = await request(app)
          .post('/remove')
          .send({ userId: '59b99db7cfa9a34dcd7885bd', itemId: '573a1390f29313caabcd446f23' });
    
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ error: 'Item not found in the user\'s list' });
      });
    
      test('Listing My Items - Invalid User ID', async () => {
        const response = await request(app).get('/list?userId=59b99db7cfa9a34dcd7885b1d');
    
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ error: 'User not found' });
      });

  });
});
