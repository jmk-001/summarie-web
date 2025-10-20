<template>
  <div
    class="h-dvh overflow-hidden flex flex-col bg-[var(--color-primary)] text-[var(--color-text)] accent-[var(--color-accent)] green-[var(--color-green)]"
  >
    <router-view v-slot="{ Component }">
      <component :is="Component" class="flex-1 min-h-0 overflow-hidden" />
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
