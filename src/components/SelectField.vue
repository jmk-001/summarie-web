<script setup lang="ts">
const { label, selected, options, fieldKey, onChanged } = defineProps<{
  label: string;
  selected?: string;
  options: readonly string[];
  fieldKey: string;
  onChanged: (key: string, e: Event) => void;
}>();
</script>

<template>
  <div class="mt-2 pl-12 pr-6">
    <label class="sr-only">{{ label }}</label>
    <select
      class="w-full px-3 py-2 rounded-lg bg-primary border border-secondary text-text focus:outline-none focus:ring-1 focus:ring-accent/60"
      :value="selected"
      @change="(e) => onChanged(fieldKey, e)"
    >
      <option v-for="opt in options" :key="opt" :value="opt">
        {{ opt }}
      </option>
    </select>
  </div>
</template>
