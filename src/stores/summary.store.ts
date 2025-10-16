import { defineStore } from "pinia";
import { apolloClient } from "../services/graphql/apollo-client";
import { PROCESS_SUMMARY } from "../services/graphql";
import type { SummaryResultOutput } from "../types/summary.types";

export const useSummaryStore = defineStore("summary", {
  state: () => ({
    latest: "",
    latestByJobId: {} as Record<string, SummaryResultOutput>,
  }),
  getters: {
    getLatest: (state) => state.latest,
    getLatestByJobId: (state) => (jobId: string) => state.latestByJobId[jobId],
  },
  actions: {
    processSummary(jobId: string) {
      const observable = apolloClient.subscribe<{
        processSummary: SummaryResultOutput;
      }>({
        query: PROCESS_SUMMARY,
        variables: { jobId },
      });

      const sub = observable.subscribe({
        next: ({ data }) => {
          if (data?.processSummary) {
            this.latestByJobId[jobId] = data.processSummary;
            this.latest = data.processSummary.content;
          }
        },
        error: (err) => {
          console.error("[processSummary] subscription error", err);
        },
        complete: () => {
          // optional: mark as completed
        },
      });

      return {
        unsubscribe: () => sub.unsubscribe(),
        observable,
      };
    },
  },
});
