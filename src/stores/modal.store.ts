import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    presetCreationModalOpened: false,
    userSettingsModalOpened: false,
  }),
  getters: {
    isPresetCreationModalOpened: (m) => m.presetCreationModalOpened,
    isUserSettingsModalOpened: (m) => m.userSettingsModalOpened,
  },
  actions: {
    openPresetCreationModal(): void {
      this.presetCreationModalOpened = true;
    },
    closePresetCreationModal(): void {
      this.presetCreationModalOpened = false;
    },
    openUserSettingsModal(): void {
      this.userSettingsModalOpened = true;
    },
    closeUserSettingsModal(): void {
      this.userSettingsModalOpened = false;
    },
  },
});
