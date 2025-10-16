<script setup lang="ts">
import { useUserStore } from "../stores/user.store";
import router from "../router";
import ContentInputForm from "../components/ContentInputForm.vue";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import {
  useDocumentStore,
  useSummaryJobStore,
  useSummaryStore,
} from "../stores";
import type { CreateSummaryJobInput } from "../types";
import type { CreateDocumentInput } from "../types/document.types";
import type { SummaryResultOutput } from "../types/summary.types";
import ContentOutputForm from "../components/ContentOutputForm.vue";

const user = useUserStore();
const document = useDocumentStore();
const summaryJob = useSummaryJobStore();
const summary = useSummaryStore();
const loading = ref(false);
const outputOpened = ref(false);

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

  const summaryJob = await createSummaryJob(document.id);

  const { observable } = await summary.processSummary(summaryJob.id);

  const result = await new Promise<SummaryResultOutput>((resolve, reject) => {
    const sub = observable.subscribe({
      next: ({ data }) => {
        if (data?.processSummary) {
          resolve(data.processSummary);
          sub.unsubscribe();
        }
      },
      error: reject,
    });
  });

  console.log(result);

  loading.value = false;
  outputOpened.value = true;
}
</script>

<template>
  <section class="dash">
    <header class="row">
      <h2>Dashboard</h2>
      <button @click="logout">Logout</button>
    </header>
    <ContentInputForm :loading="loading" @submit="onSubmitContent" />
    <ContentOutputForm
      :output-opened="outputOpened"
      :content="summary.getLatest"
    />
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
