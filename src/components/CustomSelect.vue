<script setup lang="ts">
const emits = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue", "options"]);

const updateValue = (e: Event) => {
  emits("update:modelValue", (e.target as HTMLSelectElement).value);
};
</script>

<template>
  <select
    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
    :value="props.modelValue"
    @input="updateValue"
  >
    <slot>
      <option :value="option" v-for="option in props.options" :key="option.id">
        {{ option.name }}
      </option>
    </slot>
  </select>
</template>
