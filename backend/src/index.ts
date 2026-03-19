import { app } from './app.js';
import { pool } from './db/pool.js';

const port = Number(process.env.PORT ?? 4000);
const maxConnectionAttempts = 10;
const retryDelayMs = 3000;

async function wait(ms: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function connectWithRetry() {
  for (let attempt = 1; attempt <= maxConnectionAttempts; attempt += 1) {
    try {
      await pool.query('SELECT 1');
      return;
    } catch (error) {
      if (attempt === maxConnectionAttempts) {
        throw error;
      }

      console.warn(
        `Database connection attempt ${attempt}/${maxConnectionAttempts} failed. Retrying in ${retryDelayMs}ms...`,
      );
      await wait(retryDelayMs);
    }
  }
}

async function start() {
  await connectWithRetry();

  app.listen(port, () => {
    console.log(`API server is running on http://localhost:${port}`);
  });
}

void start().catch((error) => {
  console.error('Failed to start API server');
  console.error(error);
  process.exit(1);
});
