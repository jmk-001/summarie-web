import { defineStore } from "pinia";
import type { PromptPresetParamsV1 } from "../presets/v1/types";
import { apolloClient } from "../services/graphql/apollo-client";
import { CREATE_PROMPT_PRESET } from "../services/graphql";
import { deepSet, deepUnset } from "../utils/dot-path";
import type { CreatePromptPresetInput } from "../types/prompt-preset.types";
import type { PromptVisibility } from "../types/prompt-preset.types";

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
        state.presetName !== "" &&
        state.presetDescription !== ""
      );
    },
    createInput(): CreatePromptPresetInput {
      return {
        name: this.presetName,
        description: this.presetDescription,
        schemaVersion: 1,
        params: this.params,
        visibility: "private" as PromptVisibility,
      };
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

    clearAll() {
      this.params = {} as Partial<PromptPresetParamsV1>;
      this.setName("");
      this.setDescription("");
    },

    async createPromptPreset(
      input: CreatePromptPresetInput
    ): Promise<any | null> {
      try {
        const { data } = await apolloClient.mutate({
          mutation: CREATE_PROMPT_PRESET,
          variables: { data: input },
        });
        return data.createPromptPreset;
      } catch (e) {
        throw e;
      }
    },
  },
});
