<script setup lang="ts">
const { outputOpened, content } = defineProps<{
  outputOpened: boolean;
  content: string;
}>();
</script>

<template>
  <section
    class="content-output content-input flex h-full flex-col min-h-0 gap-4 text-text py-[3%]"
  >
    <label v-if="outputOpened" class="cursor-text select-text leading-relaxed">
      {{ content }}
    </label>
  </section>
</template>
