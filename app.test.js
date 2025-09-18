import { users, checkVisited } from './app.js';

describe('Database functions', () => {
  test('users() returns an array of users', async () => {
    const result = await users();
    expect(Array.isArray(result)).toBe(true);
    // Optionally check for keys if you know the structure
    // expect(result[0]).toHaveProperty('name');
  });

  test('checkVisited() returns an array of visited countries', async () => {
    const result = await checkVisited();
    expect(Array.isArray(result)).toBe(true);
    // expect(result[0]).toHaveProperty('country_code');
  });
});
