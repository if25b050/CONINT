import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { createClient } from "redis";


const prisma = new PrismaClient();

const server = fastify();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';

const redis = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
}).on("error", (err) => console.log("Redis Client Error", err));


server.get('/ping', async (_, reply) => {
  try {
    await prisma.counter.create({
      data: {},
    });

    const count = await prisma.counter.count();

    return reply.status(200).send({ count: "TEST "+ count });
  } catch (error: any) {
    return reply.status(500).send({ error: error?.message });
  }
});

server.get('/ping/:user', async (request, reply) => {

  const user = (request.params as {user:string}).user;
  try {
    await redis.connect();

    const value = await redis.get(user);
    if(value) {
      redis.quit();
      return reply.status(200).send({ "message": "Cache hit" });
    } else {
      redis.set(user, "true");
      redis.quit();
      return reply.status(200).send({ "message": "User added to cache" });
    }
  } catch (error: any) {
    return reply.status(500).send({ error: error?.message });
  }
});

server.listen({
  host: HOST,
  port: Number(PORT),
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`)
});
