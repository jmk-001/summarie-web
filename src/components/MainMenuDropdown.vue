<script setup lang="ts">
import Dropdown, { type DropdownItem } from "./Dropdown.vue";

const mainMenuDropdownItems: DropdownItem[] = [
  { label: "Item 1", onClick: () => {} },
  { label: "Item 2", onClick: () => {} },
  { label: "Item 13", onClick: () => {} },
];
</script>

<template>
  <div class="main-menu-dropdown">
    <Dropdown label="☰" :items="mainMenuDropdownItems" />
  </div>
</template>
