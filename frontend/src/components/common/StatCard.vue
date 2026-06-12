<template><el-card><div class="metric">{{ value }}</div><div>{{ label }}</div></el-card></template>
<script setup lang="ts">
defineProps<{ label: string; value: string | number }>();
</script>
