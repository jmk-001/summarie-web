<script setup lang="ts">
import { useUserStore } from "../stores/user.store";
import router from "../router";
import ContentInputForm from "../components/ContentInputForm.vue";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useDocumentStore, useSummaryJobStore } from "../stores";
import type { CreateSummaryJobInput } from "../types";
import type { CreateDocumentInput } from "../types/document.types";

const user = useUserStore();
const document = useDocumentStore();
const summaryJob = useSummaryJobStore();
const loading = ref(false);

function logout() {
  user.logout();
  router.push("/login");
}

async function createDocument(content: string) {
  const input: CreateDocumentInput = {
    title: "",
    content: content,
    sourceType: "input",
  };
  return await document.createDocument(input);
}

async function createSummaryJob(documentId: string) {
  const input: CreateSummaryJobInput = {
    documentId: documentId,
    model: "",
    paramsSnapshot: { tone: "neutral" },
    schemaVersion: 1,
    idempotencyKey: uuidv4(),
  };
  return await summaryJob.createSummaryJob(input);
}

async function onSubmitContent(payload: { content: string }) {
  loading.value = true;

  const document = await createDocument(payload.content);
  console.log(document);

  const summaryJob = await createSummaryJob(document.id);
  console.log(summaryJob);
  loading.value = false;
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
