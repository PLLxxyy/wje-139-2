export function generateOrderNo(prefix: 'INB' | 'OUT') {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const serial = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `${prefix}-${date}-${serial}`;
}
