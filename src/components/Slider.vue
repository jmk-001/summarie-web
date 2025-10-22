<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    if (val !== internalValue.value) internalValue.value = val;
  }
);

function emitValue() {
  emit("update:modelValue", internalValue.value);
}
</script>

<template>
  <div class="slider-container">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="internalValue"
      class="slider"
      @input="emitValue"
    />
    <span class="slider-value">{{ internalValue }}</span>
  </div>
</template>

<style scoped>
.slider-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  color: var(--color-text);
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--color-secondary);
  outline: none;
  transition: background 0.2s ease;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-accent);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  background: var(--color-accent);
  transform: scale(1.1);
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-accent);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  background: var(--color-accent);
  transform: scale(1.1);
}

.slider-value {
  min-width: 2rem;
  text-align: right;
  font-size: 0.875rem;
}
</style>
