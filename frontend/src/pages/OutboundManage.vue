<template>
  <PageShell title="出库管理">
    <StepIndicator :steps="['拣货', '复核', '打包', '发货']" :active="activeStep" />
    <div style="margin-top: 16px">
      <el-button type="primary" @click="openCreateDialog">新增出库单</el-button>
    </div>
    <el-card style="margin-top: 16px">
      <el-table :data="rows">
        <el-table-column prop="orderNo" label="单号" />
        <el-table-column prop="receiver" label="收货方" />
        <el-table-column label="状态"><template #default="{ row }"><StatusBadge :status="row.status" /></template></el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="showDialog" title="新增出库单" width="900px">
      <el-alert
        v-if="expiringWarnings.length > 0"
        :title="`注意：当前选中的货品中有 ${expiringWarnings.length} 项临近过期，请优先出库或确认`"
        type="warning"
        show-icon
        :closable="false"
        style="margin-bottom: 16px"
      />
      <el-form :model="form" label-width="100px">
        <el-form-item label="收货方">
          <el-input v-model="form.receiver" placeholder="请输入收货方" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请输入收货地址" />
        </el-form-item>
        <el-form-item label="要求发货日">
          <el-date-picker v-model="form.requiredShipDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>
        <el-divider>出库明细</el-divider>
        <div v-for="(item, idx) in form.items" :key="idx" style="margin-bottom: 16px; padding: 12px; border: 1px solid #ebeef5; border-radius: 4px">
          <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center">
            <el-select v-model="item.productId" placeholder="选择货品" style="width: 220px" @change="checkExpiring">
              <el-option v-for="p in products" :key="p.id" :label="`${p.name} (${p.sku})`" :value="p.id" />
            </el-select>
            <el-input-number v-model="item.expectedQty" :min="0" placeholder="数量" style="width: 140px" />
            <el-button type="danger" text @click="removeItem(idx)">删除</el-button>
          </div>
          <div v-if="getItemWarnings(item.productId).length > 0" style="margin-top: 8px">
            <el-tag v-for="w in getItemWarnings(item.productId)" :key="w.id" type="warning" effect="light" style="margin-right: 8px; margin-bottom: 4px">
              批次 {{ w.batchNo }} 剩 {{ w.daysLeft }} 天到期 (库存 {{ w.actualQty }})
            </el-tag>
          </div>
        </div>
        <el-button type="primary" plain @click="addItem">+ 添加明细</el-button>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog>
  </PageShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import PageShell from './PageShell.vue';
import { outboundApi } from '../api/outbound';
import { productApi } from '../api/product';
import StatusBadge from '../components/common/StatusBadge.vue';
import StepIndicator from '../components/common/StepIndicator.vue';
import type { OutboundOrder, Product, ExpiringItem } from '../types';

const rows = ref<OutboundOrder[]>([]);
const products = ref<Product[]>([]);
const expiringWarnings = ref<ExpiringItem[]>([]);
const showDialog = ref(false);
const activeStep = ref(1);

const form = reactive({
  receiver: '',
  address: '',
  requiredShipDate: '',
  ownerId: 1,
  status: 'Pending',
  pickerId: 4,
  checkerId: 5,
  trackingNo: '',
  items: [{ productId: 0, binLocationId: 1, expectedQty: 0, actualQty: 0 }]
});

function openCreateDialog() {
  showDialog.value = true;
  checkExpiring();
}

function addItem() {
  form.items.push({ productId: 0, binLocationId: 1, expectedQty: 0, actualQty: 0 });
}

function removeItem(idx: number) {
  if (form.items.length > 1) form.items.splice(idx, 1);
  checkExpiring();
}

function getItemWarnings(productId: number): ExpiringItem[] {
  return expiringWarnings.value.filter(w => w.productId === productId);
}

async function checkExpiring() {
  const ids = form.items.map(i => i.productId).filter(id => id > 0);
  if (ids.length === 0) {
    expiringWarnings.value = [];
    return;
  }
  expiringWarnings.value = await outboundApi.getExpiringWarnings<ExpiringItem>(ids, 30).catch(() => []);
}

async function submitForm() {
  if (!form.receiver) { ElMessage.warning('请填写收货方'); return; }
  if (form.items.some(i => !i.productId || i.expectedQty <= 0)) {
    ElMessage.warning('请完善明细：货品、数量必填'); return;
  }
  form.items.forEach(item => { item.actualQty = item.expectedQty; });
  try {
    await outboundApi.create(form);
    ElMessage.success('创建成功');
    showDialog.value = false;
    rows.value = await outboundApi.list<OutboundOrder>().catch(() => []);
    resetForm();
  } catch (e: any) {
    ElMessage.error(e.message || '创建失败');
  }
}

function resetForm() {
  form.receiver = '';
  form.address = '';
  form.requiredShipDate = '';
  form.items = [{ productId: 0, binLocationId: 1, expectedQty: 0, actualQty: 0 }];
  expiringWarnings.value = [];
}

onMounted(async () => {
  rows.value = await outboundApi.list<OutboundOrder>().catch(() => []);
  products.value = await productApi.list<Product>().catch(() => []);
});
</script>
