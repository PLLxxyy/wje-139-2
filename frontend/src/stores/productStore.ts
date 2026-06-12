import { defineStore } from 'pinia';
export const useProductStore = defineStore('product', {
  state: () => ({ items: [] as unknown[] }),
  actions: { setItems(items: unknown[]) { this.items = items; } }
});
