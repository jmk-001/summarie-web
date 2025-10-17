import { ref, computed, onBeforeUnmount } from "vue";
import { v4 as uuidv4 } from "uuid";
import {
  useDocumentStore,
  useSummaryJobStore,
  useSummaryStore,
} from "../stores";
import type { CreateDocumentInput } from "../types";
import type { CreateSummaryJobInput } from "../types";

export function useSummaryFlow() {
  const documentStore = useDocumentStore();
  const summaryJobStore = useSummaryJobStore();
  const summaryStore = useSummaryStore();

  const loading = ref(false);
  const outputOpened = ref(false);
  const error = ref<Error | null>(null);

  const latestSummary = computed(() => summaryStore.getLatest);

  let stopSubscription: (() => void) | null = null;

  async function createDocument(content: string) {
    const input: CreateDocumentInput = {
      title: "",
      content,
      sourceType: "input",
    };
    return documentStore.createDocument(input);
  }

  async function createSummaryJob(documentId: string) {
    const input: CreateSummaryJobInput = {
      documentId,
      model: "",
      paramsSnapshot: { tone: "neutral" },
      schemaVersion: 1,
      idempotencyKey: uuidv4(),
    };
    return summaryJobStore.createSummaryJob(input);
  }

  async function run(content: string) {
    loading.value = true;
    error.value = null;

    try {
      const doc = await createDocument(content);
      const job = await createSummaryJob(doc.id);

      const { promise, stop } = summaryStore.processSummaryOnce(job.id);

      stopSubscription = stop;
      const result = await promise;
      stopSubscription = null;

      outputOpened.value = true;
      return result;
    } catch (e) {
      error.value = e as Error;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    outputOpened.value = false;
    error.value = null;
  }

  onBeforeUnmount(() => {
    if (stopSubscription) {
      stopSubscription();
      stopSubscription = null;
    }
  });

  return {
    loading,
    outputOpened,
    error,
    latestSummary,

    run,
    reset,
  };
}
