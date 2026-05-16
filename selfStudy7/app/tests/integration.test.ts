import { beforeEach, describe, expect, test } from "@jest/globals";

test('create todo integration test', async () => {
    const API_BASE = 'http://127.0.0.1:5000/api/v1/todos';
    const text = 'work: Integration test todo';
    // This is a placeholder for integration tests.
    // You can add actual integration test cases here.

    const createResponse = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, isDone: false })
    });

    const getResponse = await fetch(API_BASE);
    const { todos } = await getResponse.json() as { todos: { text: string, isDone: boolean }[] };

    expect(createResponse.ok).toBe(true);
    expect(todos.find((todo) => todo.text === text)).not.toBeNull();
});