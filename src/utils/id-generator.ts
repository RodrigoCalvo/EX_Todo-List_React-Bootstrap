export function generateId() {
  return String(Math.round(Math.random() * 10_000_000));
}
