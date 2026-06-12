<template>
  <PageShell title="货主管理">
    <div class="grid grid-3"><StatCard label="货主数" :value="rows.length" /><StatCard label="总授信" :value="rows.reduce((s, r) => s + r.creditLimit, 0)" /><StatCard label="当前欠款" :value="rows.reduce((s, r) => s + r.debt, 0)" /></div>
    <el-card style="margin-top: 16px"><el-table :data="rows"><el-table-column prop="name" label="货主" /><el-table-column prop="contact" label="联系人" /><el-table-column label="状态"><template #default="{ row }"><StatusBadge :status="row.status" /></template></el-table-column></el-table></el-card>
  </PageShell>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageShell from './PageShell.vue';
import { ownerApi } from '../api/owner';
import StatCard from '../components/common/StatCard.vue';
import StatusBadge from '../components/common/StatusBadge.vue';
import type { Owner } from '../types';
const rows = ref<Owner[]>([]);
onMounted(async () => { rows.value = await ownerApi.list<Owner>().catch(() => []); });
</script>
