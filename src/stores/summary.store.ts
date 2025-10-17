import { defineStore } from "pinia";
import { apolloClient } from "../services/graphql/apollo-client";
import { PROCESS_SUMMARY } from "../services/graphql";
import type { SummaryResultOutput } from "../types/summary.types";

export const useSummaryStore = defineStore("summary", {
  state: () => ({ latest: "" }),
  getters: { getLatest: (s) => s.latest },
  actions: {
    processSummaryOnce(jobId: string): {
      promise: Promise<SummaryResultOutput>;
      stop: () => void;
    } {
      const observable = apolloClient.subscribe<{
        processSummary: SummaryResultOutput;
      }>({
        query: PROCESS_SUMMARY,
        variables: { jobId },
      });

      let settled = false;
      const sub = observable.subscribe({
        next: ({ data }) => {
          if (settled) return;
          const result = data?.processSummary;
          if (!result) return;
          settled = true;
          this.latest = result.content;
          sub.unsubscribe();
          resolve(result);
        },
        error: (err) => {
          if (settled) return;
          settled = true;
          sub.unsubscribe();
          reject(err);
        },
        complete: () => {
          if (!settled) {
            settled = true;
            sub.unsubscribe();
            reject(new Error("Subscription completed without data"));
          }
        },
      });

      let resolve!: (v: SummaryResultOutput) => void;
      let reject!: (e: any) => void;
      const promise = new Promise<SummaryResultOutput>((res, rej) => {
        resolve = res;
        reject = rej;
      });

      const stop = () => {
        if (!settled) {
          settled = true;
          sub.unsubscribe();
          reject(new DOMException("Aborted", "AbortError"));
        }
      };

      return { promise, stop };
    },
  },
});
