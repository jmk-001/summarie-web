import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { pinia } from "./stores";
import { useUserStore } from "./stores/user.store";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/Login.vue"),
    meta: { public: true },
  },
  {
    path: "/",
    name: "dashboard",
    component: () => import("./pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const user = useUserStore(pinia);
  if (to.meta?.requiresAuth && !user.isAuthenticated) {
    return { path: "/login", query: { returnTo: to.fullPath } };
  }
  if (to.name === "login" && user.isAuthenticated) {
    return { path: "/" };
  }
  return true;
});

export default router;
