<template>
  <PageShell title="入库管理">
    <StepIndicator :steps="['收货', '质检', '上架', '完成']" :active="activeStep" />
    <div style="margin-top: 16px">
      <el-button type="primary" @click="showDialog = true">新增入库单</el-button>
    </div>
    <el-card style="margin-top: 16px">
      <el-table :data="rows" empty-text="暂无入库单，请确认后端服务或新增收货任务">
        <el-table-column prop="orderNo" label="单号" />
        <el-table-column prop="supplier" label="供应商" />
        <el-table-column label="状态"><template #default="{ row }"><StatusBadge :status="row.status" /></template></el-table-column>
        <el-table-column label="明细">
          <template #default="{ row }">
            <div v-for="item in row.items" :key="item.id" style="font-size: 12px; line-height: 1.6">
              批次: {{ item.batchNo }}
              <span v-if="item.productionDate"> | 生产: {{ item.productionDate }}</span>
              <span v-if="item.expiryDate"> | 到期: {{ item.expiryDate }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="showDialog" title="新增入库单" width="900px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="供应商">
          <el-input v-model="form.supplier" placeholder="请输入供应商" />
        </el-form-item>
        <el-form-item label="预计到货">
          <el-date-picker v-model="form.eta" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="选填" />
        </el-form-item>
        <el-divider>收货明细</el-divider>
        <div v-for="(item, idx) in form.items" :key="idx" style="margin-bottom: 16px; padding: 12px; border: 1px solid #ebeef5; border-radius: 4px">
          <div style="display: flex; gap: 12px; flex-wrap: wrap">
            <el-select v-model="item.productId" placeholder="选择货品" style="width: 180px" @change="onProductChange(idx)">
              <el-option v-for="p in products" :key="p.id" :label="`${p.name} (${p.sku})`" :value="p.id" />
            </el-select>
            <el-input v-model="item.batchNo" placeholder="批次号" style="width: 140px" />
            <el-date-picker
              v-model="item.productionDate"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="生产日期"
              style="width: 160px"
              @change="onProductionDateChange(idx)"
            />
            <el-input v-model="item.expiryDate" placeholder="到期日(自动计算)" style="width: 160px" disabled />
            <el-input-number v-model="item.expectedQty" :min="0" placeholder="数量" style="width: 120px" />
            <el-button type="danger" text @click="removeItem(idx)">删除</el-button>
          </div>
          <div v-if="getProduct(item.productId)?.shelfLifeDays" style="margin-top: 8px; color: #909399; font-size: 12px">
            保质期：{{ getProduct(item.productId)?.shelfLifeDays }} 天
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
import { inboundApi } from '../api/inbound';
import { productApi } from '../api/product';
import StatusBadge from '../components/common/StatusBadge.vue';
import StepIndicator from '../components/common/StepIndicator.vue';
import type { InboundOrder, Product } from '../types';

const rows = ref<InboundOrder[]>([]);
const products = ref<Product[]>([]);
const showDialog = ref(false);
const activeStep = ref(2);

const form = reactive({
  supplier: '',
  eta: '',
  remark: '',
  ownerId: 1,
  status: 'Pending',
  qcInspectorId: 2,
  keeperId: 3,
  items: [{ productId: 0, batchNo: '', productionDate: '', expiryDate: '', expectedQty: 0, actualQty: 0, qcResult: 'Pending', binLocationId: 1 }]
});

function addItem() {
  form.items.push({ productId: 0, batchNo: '', productionDate: '', expiryDate: '', expectedQty: 0, actualQty: 0, qcResult: 'Pending', binLocationId: 1 });
}

function removeItem(idx: number) {
  if (form.items.length > 1) form.items.splice(idx, 1);
}

function getProduct(id: number): Product | undefined {
  return products.value.find(p => p.id === id);
}

function calculateExpiry(productionDate: string, shelfLifeDays: number): string {
  if (!productionDate || !shelfLifeDays) return '';
  const d = new Date(productionDate);
  d.setDate(d.getDate() + shelfLifeDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function onProductChange(idx: number) {
  const item = form.items[idx];
  if (item.productionDate) {
    const p = getProduct(item.productId);
    item.expiryDate = calculateExpiry(item.productionDate, p?.shelfLifeDays || 0);
  }
}

function onProductionDateChange(idx: number) {
  const item = form.items[idx];
  const p = getProduct(item.productId);
  item.expiryDate = calculateExpiry(item.productionDate, p?.shelfLifeDays || 0);
}

async function submitForm() {
  if (!form.supplier) { ElMessage.warning('请填写供应商'); return; }
  if (form.items.some(i => !i.productId || !i.batchNo || i.expectedQty <= 0)) {
    ElMessage.warning('请完善明细：货品、批次号、数量必填'); return;
  }
  form.items.forEach(item => {
    item.actualQty = item.expectedQty;
    if (!item.expiryDate) {
      const p = getProduct(item.productId);
      item.expiryDate = calculateExpiry(item.productionDate, p?.shelfLifeDays || 0);
    }
  });
  try {
    await inboundApi.create(form);
    ElMessage.success('创建成功');
    showDialog.value = false;
    rows.value = await inboundApi.list<InboundOrder>().catch(() => []);
    resetForm();
  } catch (e: any) {
    ElMessage.error(e.message || '创建失败');
  }
}

function resetForm() {
  form.supplier = '';
  form.eta = '';
  form.remark = '';
  form.items = [{ productId: 0, batchNo: '', productionDate: '', expiryDate: '', expectedQty: 0, actualQty: 0, qcResult: 'Pending', binLocationId: 1 }];
}

onMounted(async () => {
  rows.value = await inboundApi.list<InboundOrder>().catch(() => []);
  products.value = await productApi.list<Product>().catch(() => []);
});
</script>
