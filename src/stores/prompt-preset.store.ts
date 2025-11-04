import { defineStore } from "pinia";
import type { CreateDocumentInput } from "../types/document.types";
import type { PromptPresetParamsV1 } from "../presets/v1/types";
import { apolloClient } from "../services/graphql/apollo-client";
import { CREATE_DOCUMENT } from "../services/graphql";
import { deepSet, deepUnset } from "../utils/dot-path";

export const usePromptPresetStore = defineStore("prompt-preset", {
  state: () => ({
    presetName: "",
    presetDescription: "",
    params: {} as Partial<PromptPresetParamsV1>,
  }),
  getters: {
    isValid(state): boolean {
      return !!(
        state.params.objective &&
        state.params.format &&
        (state as any).params.length?.kind
      );
    },
  },
  actions: {
    setName(name: string) {
      this.presetName = name;
    },
    setDescription(description: string) {
      this.presetDescription = description;
    },
    setParam(path: string, value: unknown | null | undefined) {
      if (value === null || value === undefined) {
        deepUnset(this.params, path);
      } else {
        deepSet(this.params, path, value);
      }

      if (path === "length.kind" && typeof value === "string") {
        if (value === "words") {
          deepUnset(this.params, "length.ratio");
          deepUnset(this.params, "length.maxTokens");
        } else if (value === "ratio") {
          deepUnset(this.params, "length.words");
          deepUnset(this.params, "length.maxTokens");
        } else if (value === "maxTokens") {
          deepUnset(this.params, "length.words");
          deepUnset(this.params, "length.ratio");
        }
      }
    },

    resetParams(partial?: Partial<PromptPresetParamsV1>) {
      this.params = { ...(partial ?? {}) };
    },

    async createPromptPreset(input: CreateDocumentInput) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_DOCUMENT,
        variables: { data: input },
      });
      return data.createDocument;
    },
  },
});
