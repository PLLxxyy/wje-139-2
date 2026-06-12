export function canAccess(role: string, ownerOnly = false) {
  return role === 'Admin' || role === 'WarehouseManager' || (ownerOnly && role === 'Owner');
}
