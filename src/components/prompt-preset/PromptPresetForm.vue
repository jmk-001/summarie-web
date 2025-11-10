<script setup lang="ts">
defineOptions({ name: "PromptPresetForm" });
import { ref } from "vue";
import type { Field, DiscriminatedField } from "../../presets/preset.types";
import { ChevronRightIcon } from "@heroicons/vue/16/solid";
import SelectField from "../SelectField.vue";
import { usePromptPresetStore } from "../../stores/prompt-preset.store";

const { spec } = defineProps<{
  spec: Field[];
}>();

const promptPresetStore = usePromptPresetStore();

const openKeys = ref<Record<string, boolean>>({});

function isOpen(key: string) {
  return !!openKeys.value[key];
}
function toggleOpen(key: string) {
  openKeys.value[key] = !openKeys.value[key];
}
function getParam(path: string) {
  const parts = path.split(".");
  let cur: any = promptPresetStore.params as any;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p as keyof typeof cur];
  }
  return cur;
}
function isFieldComplete(key: string) {
  const v = getParam(key);
  if (v === null || v === undefined) return false;
  if (typeof v === "string") return v.length > 0;
  return true;
}
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="p-1">
      <input
        v-model="promptPresetStore.presetName"
        id="presetName"
        type="text"
        placeholder="Name"
        required
        class="block w-full rounded-lg border border-black/10 bg-primary px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent/60"
      />
    </div>
    <div class="p-1">
      <input
        v-model="promptPresetStore.presetDescription"
        id="presetDescription"
        type="text"
        placeholder="Description"
        required
        class="block w-full rounded-lg border border-black/10 bg-primary px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent/60"
      />
    </div>
    <div
      v-for="field in spec"
      :key="field.key"
      class="rounded-xl border border-secondary text-text"
    >
      <!-- Item header -->
      <button
        type="button"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl"
        @click="toggleOpen(field.key)"
      >
        <span
          class="inline-flex items-center justify-center size-5 rounded-md border border-secondary text-text/80"
          :style="{
            transform: isOpen(field.key) ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 100ms ease',
          }"
          aria-hidden="true"
        >
          <ChevronRightIcon />
        </span>
        <span class="font-medium">{{ field.label }}</span>
        <span
          v-if="isFieldComplete(field.key)"
          class="ml-auto text-green-500 text-sm"
          aria-label="Completed"
        >
          ✓
        </span>
        <span v-if="field.required" class="ml-1 text-xs opacity-60"
          >(required)</span
        >
      </button>

      <!-- Item content -->
      <div v-if="isOpen(field.key) && field.kind === 'select'">
        <SelectField
          :label="field.label"
          :options="field.options"
          :model-value="getParam(field.key)"
          @update:model-value="(v: string) => {
            promptPresetStore.setParam(field.key, v)
            openKeys[field.key] = false
            }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.size-5 {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
