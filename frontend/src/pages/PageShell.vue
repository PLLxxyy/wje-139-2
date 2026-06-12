<template>
  <div class="layout">
    <aside class="sidebar"><div class="brand">供应链仓储<br />协同系统</div><nav class="nav"><RouterLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }}</RouterLink></nav></aside>
    <main class="main"><div class="head"><h1>{{ title }}</h1></div><slot /></main>
  </div>
</template>
<script setup lang="ts">
defineProps<{ title: string }>();
const nav = [{ to: '/dashboard', label: '仓库总览' }, { to: '/inbound', label: '入库管理' }, { to: '/outbound', label: '出库管理' }, { to: '/bin-locations', label: '库位管理' }, { to: '/owners', label: '货主管理' }];
</script>
