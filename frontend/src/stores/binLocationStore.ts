import { defineStore } from 'pinia';
export const useBinLocationStore = defineStore('binLocation', {
  state: () => ({ items: [] as unknown[] }),
  actions: { setItems(items: unknown[]) { this.items = items; } }
});
