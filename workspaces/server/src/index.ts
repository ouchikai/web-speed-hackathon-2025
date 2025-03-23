import '@wsh-2025/server/src/setups/luxon';

import fastifyCompress from '@fastify/compress';
import cors from '@fastify/cors';
import fastify from 'fastify';

import { registerApi } from '@wsh-2025/server/src/api';
import { initializeDatabase } from '@wsh-2025/server/src/drizzle/database';
import { registerSsr } from '@wsh-2025/server/src/ssr';
import { registerStreams } from '@wsh-2025/server/src/streams';

async function main() {
  await initializeDatabase();

  const app = fastify();
  // 圧縮プラグインを登録
  app.register(fastifyCompress, {
    // グローバルで全てのレスポンスを圧縮
    encodings: ['gzip', 'br'],
    global: true,  // 使用する圧縮方式（gzip, brotli）
  });

  app.addHook('onSend', async (_req, reply) => {
    reply.header('cache-control', 'public, max-age=604800'); // 604800秒 = 1週間
  });
  app.register(cors, {
    origin: true,
  });
  app.register(registerApi, { prefix: '/api' });
  app.register(registerStreams);
  app.register(registerSsr);

  await app.ready();
  const address = await app.listen({ host: '0.0.0.0', port: Number(process.env['PORT']) });
  console.log(`Server listening at ${address}`);
}

void main();
