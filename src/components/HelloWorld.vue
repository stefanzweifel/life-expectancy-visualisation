<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <h1 class="green">{{ msg }}</h1>
</template>
