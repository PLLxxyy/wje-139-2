import { defineStore } from 'pinia';
export const useOwnerStore = defineStore('owner', {
  state: () => ({ items: [] as unknown[] }),
  actions: { setItems(items: unknown[]) { this.items = items; } }
});
