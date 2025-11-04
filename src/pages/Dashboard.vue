<script setup lang="ts">
import router from "../router";
import { useUserStore } from "../stores";
import ContentIO from "../components/ContentIO.vue";
import MainMenuDropdown from "../components/MainMenuDropdown.vue";
import { useModalStore } from "../stores/modal.store";
import PresetCreationModal from "../components/prompt-preset/PresetCreationModal.vue";
import { UserCircleIcon } from "@heroicons/vue/16/solid";

const user = useUserStore();
const modal = useModalStore();

function logout() {
  user.logout();
  router.push("/login");
}
</script>

<template>
  <section class="dash h-dvh flex flex-col px-[10%] py-[0.5%] gap-y-2">
    <header class="row flex items-center justify-between">
      <MainMenuDropdown />
      <button
        @click="logout"
        class="underline underline-offset-4 hover:opacity-80"
      >
        <UserCircleIcon class="w-6 h-6 text-text" />
      </button>
    </header>

    <div class="flex-1 min-h-0">
      <ContentIO />
    </div>

    <PresetCreationModal v-if="modal.isPresetCreationModalOpened" />
  </section>
</template>
