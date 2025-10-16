<script setup lang="ts">
import { ref } from "vue";

const { loading = false } = defineProps<{ loading?: boolean }>();

const emit = defineEmits<{
  (e: "submit", payload: { content: string }): void;
}>();

function onSubmit() {
  error.value = "";

  if (inputText.value.length <= 0) {
    error.value = "Content cannot be empty";
    return;
  }

  emit("submit", {
    content: inputText.value,
  });
}

const inputText = ref("");
const error = ref("");
</script>

<template>
  <section class="content-input">
    <input v-model="inputText" />
    <button :disabled="loading" type="button" @click="onSubmit">
      Submit content
    </button>
  </section>
</template>
