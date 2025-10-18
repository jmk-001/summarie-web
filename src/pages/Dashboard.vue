<script setup lang="ts">
import router from "../router";
import ContentInput from "../components/ContentInput.vue";
import ContentOutputForm from "../components/ContentOutput.vue";
import { useUserStore } from "../stores";
import { useSummaryFlow } from "../composables/useSummaryFlow";
import ThemeSwitch from "../components/ThemeSwitch.vue";

const user = useUserStore();
const { loading, outputOpened, latestSummary, run, reset, error } =
  useSummaryFlow();

function logout() {
  user.logout();
  router.push("/login");
}

async function onSubmitContent(payload: { content: string }) {
  try {
    await run(payload.content);
  } catch {
    console.error(error.value);
  }
}
</script>

<template>
  <section class="dash flex flex-col min-h-dvh px-4 md:px-8">
    <ThemeSwitch />
    <header class="row">
      <h2>Dashboard</h2>
      <button @click="logout">Logout</button>
    </header>

    <ContentInput :loading="loading" @submit="onSubmitContent" />

    <ContentOutputForm
      :output-opened="outputOpened"
      :content="latestSummary"
      @close="reset"
    />

    <p v-if="error" class="error">{{ error.message }}</p>
  </section>
</template>
