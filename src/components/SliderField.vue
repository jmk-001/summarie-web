<script setup lang="ts">
const { label, modelValue } = defineProps<{
  label: string;
  modelValue?: string;
  options: readonly string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function onChange(e: Event) {
  emit("update:modelValue", (e.target as HTMLSelectElement).value);
}
</script>

<template>
  <div class="mt-2 pl-12 pr-6">
    <label class="sr-only">{{ label }}</label>
    <select
      class="w-full px-3 py-2 rounded-lg bg-primary border border-secondary text-text focus:outline-none focus:ring-1 focus:ring-accent/60"
      :value="modelValue"
      @change="onChange"
    >
    </select>
  </div>
</template>
