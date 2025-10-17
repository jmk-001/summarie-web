<script setup lang="ts">
const { outputOpened, content } = defineProps<{
  outputOpened: boolean;
  content: string;
}>();
</script>

<template>
  <section class="content-output">
    <label v-if="outputOpened"> {{ content }} </label>
  </section>
</template>
