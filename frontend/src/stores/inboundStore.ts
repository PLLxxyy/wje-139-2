import { defineStore } from 'pinia';
export const useInboundStore = defineStore('inbound', {
  state: () => ({ items: [] as unknown[] }),
  actions: { setItems(items: unknown[]) { this.items = items; } }
});
