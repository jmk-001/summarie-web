import axios from "axios";
import router from "../../router";
import { pinia } from "../../stores/pinia";
import { useUserStore } from "../../stores/user.store";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

http.interceptors.request.use((config) => {
  const user = useUserStore(pinia);
  if (user.accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      const user = useUserStore(pinia);
      user.logout();
      const returnTo = router.currentRoute.value.fullPath || "/";
      if (router.currentRoute.value.path !== "/login") {
        router.push({ path: "/login", query: { returnTo } });
      }
    }
    return Promise.reject(err);
  }
);
