import { defineStore } from "pinia";
import type { CreateSummaryJobInput } from "../types";
import { apolloClient } from "../services/graphql/apollo-client";
import { CREATE_SUMMARY_JOB } from "../services/graphql";

export const useSummaryJobStore = defineStore("summaryJob", {
  state: () => ({}),
  getters: {},
  actions: {
    async createSummaryJob(input: CreateSummaryJobInput) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_SUMMARY_JOB,
        variables: { data: input },
      });
      return data.createSummaryJob;
    },
  },
});
