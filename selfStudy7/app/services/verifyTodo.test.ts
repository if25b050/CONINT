import { verifyTodo } from './verifyTodo';
import { expect, test } from '@jest/globals';

test('verifyTodo returns true for valid work todo type', () => {
    expect(verifyTodo('work: Finish the report')).toBe(true);
});