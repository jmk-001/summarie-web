import { defineStore } from "pinia";

const TOKEN_KEY = "accessToken";

export const useUserStore = defineStore("user", {
  state: () => ({
    accessToken: localStorage.getItem(TOKEN_KEY) ?? "",
    email: "",
  }),
  getters: {
    isAuthenticated: (s) => !!s.accessToken,
  },
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
    },
    logout() {
      this.setAccessToken("");
      this.email = "";
    },
  },
});
