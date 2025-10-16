<script setup lang="ts">
const props = defineProps<{ outputOpened: boolean; content: string }>();
</script>

<template>
  <section class="content-output">
    <label v-if="props.outputOpened"> {{ content }} </label>
  </section>
</template>
