<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Summarie from "./Summarie.vue";

const { loading = false } = defineProps<{ loading?: boolean }>();

const emit = defineEmits<{
  (e: "submit", payload: { content: string }): void;
}>();

const inputText = ref("");
const error = ref("");

function submitNow() {
  error.value = "";
  if (inputText.value.trim().length === 0) {
    error.value = "Content cannot be empty";
    return;
  }
  emit("submit", { content: inputText.value });
}

function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    submitNow();
  }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

const chars = computed(() => inputText.value.length);
const tooLong = computed(() => chars.value > 20000);
</script>

<template>
  <section
    class="content-input flex h-full flex-col min-h-0 gap-4 text-text px-[1%]"
    aria-labelledby="content-form-title"
  >
    <header class="flex items-end justify-between">
      <Summarie :size="50" :play-intro="false" />
      <button
        type="button"
        :disabled="loading || tooLong"
        @click="submitNow"
        class="inline-flex items-center gap-2 px-4 md:px-5 h-10 rounded-xl bg-green text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-95 active:opacity-90 transition-opacity"
      >
        <svg
          v-if="loading"
          class="size-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            stroke-width="3"
            opacity="0.25"
          />
          <path
            d="M21 12a9 9 0 0 1-9 9"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
        <span>{{ loading ? "" : "Summarize" }}</span>
      </button>
    </header>

    <textarea
      v-model="inputText"
      :aria-invalid="!!error || tooLong"
      :aria-describedby="error ? 'content-error' : undefined"
      class="flex-1 min-h-0 w-full resize-none outline-none border border-secondary rounded-2xl p-4 md:p-6 bg-primary text-text placeholder:opacity-60 leading-relaxed ring-0 focus:border-transparent focus:ring-1 focus:ring-accent/60"
      placeholder="Paste the article, notes, transcript, or URL here…"
    />

    <div class="flex items-center justify-between">
      <div class="text-sm min-h-[1em]">
        <p
          v-if="error || tooLong"
          id="content-error"
          class="text-red-500"
          role="alert"
        >
          {{ error || "This is longer than the recommended limit." }}
        </p>
      </div>
      <span
        class="text-xs tabular-nums"
        :class="tooLong ? 'text-red-500' : 'opacity-60'"
      >
        {{ chars.toLocaleString() }} / 20000
      </span>
    </div>
  </section>
</template>
