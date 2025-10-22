<script setup lang="ts">
import router from "../router";
import { useUserStore } from "../stores";
import ThemeSwitch from "../components/ThemeSwitch.vue";
import ContentIO from "../components/ContentIO.vue";
import MainMenuDropdown from "../components/MainMenuDropdown.vue";

const user = useUserStore();

function logout() {
  user.logout();
  router.push("/login");
}
</script>

<template>
  <!-- Full viewport height, responsive padding x=10% y=1% -->
  <section class="dash h-dvh flex flex-col px-[10%] py-[0.5%] gap-y-2">
    <!-- Optional theme switch row -->
    <!-- <ThemeSwitch /> -->

    <!-- Header row (auto height) -->
    <header class="row flex items-center justify-between">
      <MainMenuDropdown />
      <button
        @click="logout"
        class="underline underline-offset-4 hover:opacity-80"
      >
        Logout
      </button>
    </header>

    <!-- Main area should fill the rest of the screen -->
    <div class="flex-1 min-h-0">
      <ContentIO />
    </div>
  </section>
</template>
