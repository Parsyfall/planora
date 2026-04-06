import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

let server;

test('GET /api/health returns ok', async (t) => {
  server = app.listen(0);
  t.after(() => server.close());

  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();

  const response = await fetch(`http://127.0.0.1:${port}/api/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { status: 'ok' });
});
