<script setup lang="ts">
import { useUserStore } from "../stores/user.store";
import router from "../router";
import ContentInputForm from "../components/ContentInputForm.vue";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useSummaryJobStore } from "../stores/summary-job.store";
import type { CreateSummaryJobInput } from "../types";

const user = useUserStore();
const summaryJob = useSummaryJobStore();
const loading = ref(false);

function logout() {
  user.logout();
  router.push("/login");
}

function saveDocument(content: string) {}

function onSubmitContent(payload: { content: string }) {
  const input: CreateSummaryJobInput = {
    documentId: "", // TODO: include document
    model: "",
    paramsSnapshot: { tone: "neutral" },
    schemaVersion: 1,
    idempotencyKey: uuidv4(),
  };
  summaryJob.createSummaryJob(input);
}
</script>

<template>
  <section class="dash">
    <header class="row">
      <h2>Dashboard</h2>
      <button @click="logout">Logout</button>
    </header>
    <ContentInputForm :loading="loading" @submit="onSubmitContent" />
  </section>
</template>

<style scoped>
.dash {
  max-width: 720px;
  margin: 24px auto;
  padding: 0 12px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
