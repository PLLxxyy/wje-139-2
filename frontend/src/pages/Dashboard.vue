<template>
  <PageShell title="仓库总览">
    <div class="grid grid-3">
      <StatCard label="今日收货" :value="rows.length" />
      <StatCard label="待处理任务" :value="rows.filter(r => r.status !== 'Completed').length" />
      <StatCard label="30天内临期" :value="expiringItems.length" />
      <el-card><OccupancyRing :value="76" /></el-card>
    </div>
    <el-card style="margin-top: 16px">
      <el-table :data="rows">
        <el-table-column prop="orderNo" label="入库单" />
        <el-table-column prop="supplier" label="供应商" />
        <el-table-column prop="status" label="状态" />
      </el-table>
    </el-card>
    <el-card style="margin-top: 16px" v-if="expiringItems.length > 0">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <el-alert title="临期预警（30天内到期）" type="warning" :closable="false" show-icon style="border: none; padding: 0" />
        </div>
      </template>
      <el-table :data="expiringItems" style="width: 100%">
        <el-table-column prop="productName" label="货品名称" />
        <el-table-column prop="productSku" label="SKU" />
        <el-table-column prop="batchNo" label="批次号" />
        <el-table-column label="剩余天数">
          <template #default="{ row }">
            <el-tag :type="row.daysLeft <= 7 ? 'danger' : row.daysLeft <= 15 ? 'warning' : 'info'" effect="dark">
              {{ row.daysLeft }} 天
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="productionDate" label="生产日期" />
        <el-table-column prop="expiryDate" label="到期日" />
        <el-table-column prop="actualQty" label="库存数量" />
        <el-table-column prop="orderNo" label="来源入库单" />
      </el-table>
    </el-card>
    <el-empty v-else style="margin-top: 16px" description="暂无临期货品" />
  </PageShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageShell from './PageShell.vue';
import { inboundApi } from '../api/inbound';
import StatCard from '../components/common/StatCard.vue';
import OccupancyRing from '../components/common/OccupancyRing.vue';
import type { InboundOrder, ExpiringItem } from '../types';

const rows = ref<InboundOrder[]>([]);
const expiringItems = ref<ExpiringItem[]>([]);

onMounted(async () => {
  rows.value = await inboundApi.list<InboundOrder>().catch(() => []);
  expiringItems.value = await inboundApi.getExpiringItems<ExpiringItem>(30).catch(() => []);
});
</script>
