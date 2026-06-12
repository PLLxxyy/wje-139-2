<template><el-steps :active="active" finish-status="success"><el-step v-for="step in steps" :key="step" :title="step" /></el-steps></template>
<script setup lang="ts">
defineProps<{ steps: string[]; active: number }>();
</script>
