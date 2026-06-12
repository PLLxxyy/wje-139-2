<template><el-progress type="dashboard" :percentage="value" :color="value > 80 ? '#dc2626' : '#0f766e'" /></template>
<script setup lang="ts">
defineProps<{ value: number }>();
</script>
