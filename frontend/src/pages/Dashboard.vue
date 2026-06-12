<template>
  <PageShell title="仓库总览">
    <div class="grid grid-3"><StatCard label="今日收货" :value="rows.length" /><StatCard label="待处理任务" :value="rows.filter(r => r.status !== 'Completed').length" /><el-card><OccupancyRing :value="76" /></el-card></div>
    <el-card style="margin-top: 16px"><el-table :data="rows"><el-table-column prop="orderNo" label="入库单" /><el-table-column prop="supplier" label="供应商" /><el-table-column prop="status" label="状态" /></el-table></el-card>
  </PageShell>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageShell from './PageShell.vue';
import { inboundApi } from '../api/inbound';
import StatCard from '../components/common/StatCard.vue';
import OccupancyRing from '../components/common/OccupancyRing.vue';
import type { InboundOrder } from '../types';
const rows = ref<InboundOrder[]>([]);
onMounted(async () => { rows.value = await inboundApi.list<InboundOrder>().catch(() => []); });
</script>
