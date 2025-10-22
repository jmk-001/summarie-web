<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useModalStore } from "../stores/modal.store";
import Slider from "./Slider.vue";

const modal = useModalStore();
const length = ref(30);

function closeModal() {
  modal.closePresetCreationModal();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") closeModal();
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  document.documentElement.classList.add("overflow-hidden");
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.documentElement.classList.remove("overflow-hidden");
});
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[1000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preset-creation-modal-title"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 backdrop-blur-xs"
        aria-hidden="true"
        @click="closeModal"
      />

      <!-- Modal container -->
      <div
        class="relative z-10 w-[90%] max-w-lg mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-secondary shadow-2xl backdrop-blur p-6 md:p-8 flex flex-col"
      >
        <!-- Close button -->
        <button
          @click="closeModal"
          class="absolute top-4 left-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xl"
          aria-label="Close modal"
        >
          ✕
        </button>

        <!-- Modal content -->
        <h2
          id="preset-creation-modal-title"
          class="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-4"
        >
          Create Preset
        </h2>

        <div
          class="flex-1 min-h-0 overflow-auto flex items-center justify-center"
        >
          <Slider v-model="length" :min="0" :max="100" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
