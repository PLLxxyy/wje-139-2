<template>
  <PageShell title="库位管理">
    <div class="grid grid-3"><el-card v-for="bin in rows" :key="bin.id"><h3>{{ bin.area }}-{{ bin.rack }}-{{ bin.level }}{{ bin.column }}</h3><OccupancyRing :value="bin.occupancy" /><StatusBadge :status="bin.status" /></el-card></div>
  </PageShell>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageShell from './PageShell.vue';
import { binLocationApi } from '../api/binLocation';
import OccupancyRing from '../components/common/OccupancyRing.vue';
import StatusBadge from '../components/common/StatusBadge.vue';
import type { BinLocation } from '../types';
const rows = ref<BinLocation[]>([]);
onMounted(async () => { rows.value = await binLocationApi.list<BinLocation>().catch(() => []); });
</script>
