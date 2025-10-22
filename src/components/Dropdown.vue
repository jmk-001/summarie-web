<script setup lang="ts">
import { ref } from "vue";
import { vOnClickOutside } from "@vueuse/components";

export interface DropdownItem {
  label: string;
  onClick: () => void;
}

const { label, items } = defineProps<{
  label?: string;
  items: DropdownItem[];
}>();

const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function handleItemClick(item: DropdownItem) {
  item.onClick();
  isOpen.value = false;
}

function closeDropdown() {
  isOpen.value = false;
}
</script>

<template>
  <div
    class="relative inline-block text-left"
    v-on-click-outside="closeDropdown"
  >
    <button
      @click="toggleDropdown"
      class="inline-flex justify-center w-full bg-primary text-white/30 text-lg focus:outline-white/30"
    >
      {{ label || "Dropdown" }}
    </button>

    <div
      v-if="isOpen"
      class="origin-bottom-left absolute left-0 top-full mt-1 w-40 rounded-md shadow-lg bg-secondary z-[1000]"
    >
      <div class="py-1">
        <button
          v-for="(item, index) in items"
          :key="index"
          @click="handleItemClick(item)"
          class="block w-full text-left text-text px-4 py-2 hover:bg-primary"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </div>
</template>
