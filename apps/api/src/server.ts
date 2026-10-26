import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

app.listen(env.port, '0.0.0.0', () => {
  console.log(`Porchlight API listening on http://127.0.0.1:${env.port}`);
});
