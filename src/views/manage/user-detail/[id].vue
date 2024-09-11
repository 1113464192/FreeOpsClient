<script setup lang="ts">
interface Props {
  id: string;
}

defineProps<Props>();
</script>

<template>
  <!-- <LookForward /> -->
  <div>id: {{ id }}</div>
</template>

<style scoped></style>
