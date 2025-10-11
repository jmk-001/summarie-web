<template>
  <section class="login">
    <h2>Sign in</h2>

    <form @submit.prevent="onSubmit" class="form">
      <label>
        Email
        <input v-model="email" type="email" required autocomplete="username" />
      </label>

      <label>
        Password
        <input
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
        />
      </label>

      <button :disabled="loading" type="submit">
        {{ loading ? "Signing in…" : "Sign in" }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { http } from "../services/http";
import { useUserStore } from "../stores/user.store";
import type { SignInDto, SignInResponse } from "../types/auth-types";
import { useRoute, useRouter } from "vue-router";

const user = useUserStore();
const route = useRoute();
const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

async function onSubmit() {
  loading.value = true;
  error.value = "";

  const payload: SignInDto = { email: email.value, password: password.value };

  try {
    const res = await http.post<SignInResponse>("/auth/sign-in", payload);
    user.setAccessToken(res.data.accessToken);

    user.email = email.value;

    const returnTo = (route.query.returnTo as string) || "/";
    router.replace(returnTo);
  } catch (e: any) {
    error.value = e?.response?.data?.message || "Failed to sign in";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login {
  max-width: 420px;
  margin: 48px auto;
  padding: 0 16px;
}
.form {
  display: grid;
  gap: 12px;
}
input {
  width: 100%;
  padding: 8px;
}
button {
  padding: 8px 12px;
}
.error {
  color: #b00020;
}
</style>
