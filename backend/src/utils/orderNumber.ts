export function generateOrderNo(prefix: 'INB' | 'OUT') { return `${prefix}-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-0001`; }
