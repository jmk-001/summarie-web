<script setup lang="ts">
import { useTheme } from "../composables/useTheme";
const { mode, setTheme } = useTheme();
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <button
      class="px-3 py-1 rounded border text-sm"
      :class="mode === 'light' ? 'font-semibold' : ''"
      @click="setTheme('light')"
      aria-label="Use light theme"
    >
      🌞 Light
    </button>

    <button
      class="px-3 py-1 rounded border text-sm"
      :class="mode === 'dark' ? 'font-semibold' : ''"
      @click="setTheme('dark')"
      aria-label="Use dark theme"
    >
      🌙 Dark
    </button>

    <button
      class="px-3 py-1 rounded border text-sm"
      :class="mode === 'system' ? 'font-semibold' : ''"
      @click="setTheme('system')"
      aria-label="Use system theme"
    >
      💻 System
    </button>
  </div>
</template>
