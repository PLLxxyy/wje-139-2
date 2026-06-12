<template>
  <PageShell title="出库管理">
    <StepIndicator :steps="['拣货','复核','打包','发货']" :active="1" />
    <el-card style="margin-top: 16px"><el-table :data="rows"><el-table-column prop="orderNo" label="单号" /><el-table-column prop="receiver" label="收货方" /><el-table-column label="状态"><template #default="{ row }"><StatusBadge :status="row.status" /></template></el-table-column></el-table></el-card>
  </PageShell>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageShell from './PageShell.vue';
import { outboundApi } from '../api/outbound';
import StatusBadge from '../components/common/StatusBadge.vue';
import StepIndicator from '../components/common/StepIndicator.vue';
import type { OutboundOrder } from '../types';
const rows = ref<OutboundOrder[]>([]);
onMounted(async () => { rows.value = await outboundApi.list<OutboundOrder>().catch(() => []); });
</script>
