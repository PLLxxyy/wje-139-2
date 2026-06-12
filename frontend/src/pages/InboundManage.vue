<template>
  <PageShell title="入库管理">
    <StepIndicator :steps="['收货','质检','上架','完成']" :active="2" />
    <el-card style="margin-top: 16px">
      <el-table :data="rows" empty-text="暂无入库单，请确认后端服务或新增收货任务">
        <el-table-column prop="orderNo" label="单号" />
        <el-table-column prop="supplier" label="供应商" />
        <el-table-column label="状态"><template #default="{ row }"><StatusBadge :status="row.status" /></template></el-table-column>
      </el-table>
    </el-card>
  </PageShell>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageShell from './PageShell.vue';
import { inboundApi } from '../api/inbound';
import StatusBadge from '../components/common/StatusBadge.vue';
import StepIndicator from '../components/common/StepIndicator.vue';
import type { InboundOrder } from '../types';
const rows = ref<InboundOrder[]>([]);
onMounted(async () => { rows.value = await inboundApi.list<InboundOrder>().catch(() => []); });
</script>
