<template><el-tag :type="type">{{ status }}</el-tag></template>
<script setup lang="ts">
const props = defineProps<{ status: string }>();
const type = props.status.includes('Completed') || props.status.includes('Active') ? 'success' : props.status.includes('Pending') ? 'warning' : 'info';
</script>
