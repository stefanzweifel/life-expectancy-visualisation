<script setup lang="ts">
const emits = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue"]);

const updateValue = (e: Event) => {
  emits("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
    :value="props.modelValue"
    autocomplete="off"
    @input="updateValue"
  />
</template>
