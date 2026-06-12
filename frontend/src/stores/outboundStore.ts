import { defineStore } from 'pinia';
export const useOutboundStore = defineStore('outbound', {
  state: () => ({ items: [] as unknown[] }),
  actions: { setItems(items: unknown[]) { this.items = items; } }
});
