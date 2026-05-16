const ALLOWED_TYPES = ['work', 'personal', 'other'];

export function verifyTodo(text: string): boolean {
  const type = text?.split(':')?.[0]?.toLowerCase();

  if (!type) {
    return false;
  }

  if (!ALLOWED_TYPES.includes(type)) {
    return false;
  }

  return true;
}
