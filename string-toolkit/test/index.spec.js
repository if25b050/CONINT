const stringToolkit = require('../dist/index');

describe('toSnakeCase', () => {
  test('returns the string converted to lower snake case', () => {
    const originalString = "Hello World!";
    const newString = stringToolkit.toSnakeCase(originalString);
    const expectedString = "hello_world!"

    // Check that a new string is returned (not the same reference)
    expect(newString).not.toBe(originalString);

    // Check that new string is correct
    expect(newString).toEqual(expectedString);
  });
});