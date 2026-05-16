import fastify, { FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import fastifyStatic from '@fastify/static';
import { verifyTodo } from './services/verifyTodo';

const prisma = new PrismaClient();

const server = fastify();

// serve static files
// from the public folder
// at the root path "/"
server.register(fastifyStatic, {
  root: `${__dirname}/public`,
  prefix: '/',
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

server.get('/api/v1/todos', async (_, reply) => {
  try {
    const todos = await prisma.todo.findMany();

    return reply.status(200).send({ todos });
  } catch (error: any) {
    return reply.status(500).send({ error: error?.message });
  }
});

server.get('/api/v1/todos/:id', async (
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply,
) => {
  try {
    const { id } = request.params;

    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    return reply.status(200).send({ todo });
  }
  catch (error: any) {
    return reply.status(500).send({ error: error?.message });
  }
});

server.post('/api/v1/todos', async (
  request: FastifyRequest<{
    Body: {
      text: string;
    }
  }>,
  reply,
) => {
  try {
    const { text } = request.body;

    if (!verifyTodo(text)) {
      return reply.status(400).send({
        error: 'Invalid todo text. Todo text should start with work:, personal:, or other:',
      });
    }

    const todo = await prisma.todo.create({
      data: {
        text,
      },
    });

    return reply.status(201).send({ todo });
  }
  catch (error: any) {
    return reply.status(500).send({ error: error?.message });
  }
});

server.put('/api/v1/todos/:id', async (
  request: FastifyRequest<{
    Params: {
      id: string;
    };
    Body: {
      text?: string;
      isDone?: boolean;
    }
  }>,
  reply,
) => {
  try {
    const { id } = request.params;
    const { text, isDone } = request.body;

    const foundTodo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    const todo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        text: !text ? foundTodo?.text : text,
        isDone: !isDone ? foundTodo?.isDone : isDone,
      },
    });

    return reply.status(200).send({
      todo,
    });
  }
  catch (error: any) {
    return reply.status(500).send({ error: error?.message });
  }
});

server.delete('/api/v1/todos/:id', async (
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply,
) => {
  try {
    const { id } = request.params;

    const todo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    return reply.status(200).send({ todo });
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
