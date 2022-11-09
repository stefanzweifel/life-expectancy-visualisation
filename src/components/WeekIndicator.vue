<template>
  <div
    class="rounded-full h-3 md:h-2 w-3 md:w-2 transition"
    :title="`${noun} #${index}`"
    :class="{
      'bg-blue-600': isPast,
      'bg-blue-200': !isPast,
    }"
  ></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  age: {
    type: Number,
    default: 0,
  },
  noun: {
    type: String,
    default: 'Week',
  },
});

const isPast = computed<boolean>(function () {
  return props.index <= props.age;
});
</script>
