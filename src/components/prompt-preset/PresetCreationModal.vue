<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import { useModalStore } from "../../stores/modal.store";
import PromptPresetForm from "./PromptPresetForm.vue";
import { formSpecV1 } from "../../presets/v1/form-spec";

const modal = useModalStore();
const params = reactive<Record<string, any>>({});

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
        class="relative z-10 w-[92%] sm:w-[90%] max-w-xl lg:max-w-2xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-secondary shadow-2xl p-6 md:p-5 flex flex-col max-h-[50vh] overflow-hidden"
      >
        <!-- Close button -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xl"
          aria-label="Close modal"
        >
          ✕
        </button>

        <!-- Create preset button -->
        <div class="absolute bottom-10 right-14">
          <button
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors"
            @click=""
          >
            Create preset
          </button>
        </div>

        <!-- Modal content -->
        <div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <PromptPresetForm :spec="formSpecV1" v-model="params" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
