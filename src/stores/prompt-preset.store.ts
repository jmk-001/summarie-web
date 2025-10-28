import { defineStore } from "pinia";
import type { CreateDocumentInput } from "../types/document.types";
import { apolloClient } from "../services/graphql/apollo-client";
import { CREATE_DOCUMENT } from "../services/graphql";

export const usePromptPresetStore = defineStore("prompt-preset", {
  state: () => ({ length }),
  getters: {},
  actions: {
    async createPromptPreset(input: CreateDocumentInput) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_DOCUMENT,
        variables: { data: input },
      });
      return data.createDocument;
    },
  },
});
