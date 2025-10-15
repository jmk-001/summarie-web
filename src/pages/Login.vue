<script setup lang="ts">
import { ref } from "vue";
import { http } from "../services/rest/http";
import { useUserStore } from "../stores/user.store";
import type {
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
} from "../types";
import { useRoute, useRouter } from "vue-router";
import LoginForm from "../components/LoginForm.vue";

const user = useUserStore();
const route = useRoute();
const router = useRouter();

const loading = ref(false);
const error = ref("");

async function handleSubmit(payload: {
  mode: "SignIn" | "SignUp";
  email: string;
  password: string;
}) {
  loading.value = true;
  error.value = "";
  try {
    if (payload.mode === "SignIn") {
      const body: SignInDto = {
        email: payload.email,
        password: payload.password,
      };
      const res = await http.post<SignInResponse>("/auth/sign-in", body);
      user.setAccessToken(res.data.accessToken);
      user.email = payload.email;
    } else {
      const body: SignUpDto = {
        email: payload.email,
        password: payload.password,
      };
      const res = await http.post<SignUpResponse>("/auth/sign-up", body);
      user.setAccessToken(res.data.accessToken);
      user.email = payload.email;
    }

    const returnTo = (route.query.returnTo as string) || "/";
    router.replace(returnTo);
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Failed to sign in";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <LoginForm :loading="loading" :error="error" @submit="handleSubmit" />
</template>

<style scoped></style>
