// app.test.js
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { users, checkVisited , country } from './app.js';
import { db } from './app.js'

test('users() returns an array of users', async () => {
  const result = await users();
  assert.ok(Array.isArray(result), 'users() should return an array');
  if (result.length > 0) {
    assert.ok('name' in result[0], 'user objects should have a name property');
  }
});
test('country() returns an array of countries', async () => {
  const result = await country();
  assert.ok(Array.isArray(result), 'country() should return an array');
  if (result.length > 0) {
    assert.ok('country_code' in result[0], 'Each country should have a name property');
  }
});

test('checkVisited() returns an array of visited countries', async () => {
  const result = await checkVisited();
  assert.ok(Array.isArray(result), 'checkVisited() should return an array');
});

after(async () => {
  // Close the database pool/connection if you have one
  if (db) {
    await db.end();
  }

  // Force exit only if you really need to
  // (not recommended unless your CI/CD requires it)
  process.exit(0);
});
