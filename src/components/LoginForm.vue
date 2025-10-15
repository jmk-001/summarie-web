<script setup lang="ts">
import { ref } from "vue";

const AUTH_MODE = { SignIn: "SignIn", SignUp: "SignUp" } as const;
type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE];

const props = defineProps<{
  mode?: AuthMode;
  loading?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (
    e: "submit",
    payload: { mode: AuthMode; email: string; password: string }
  ): void;
  (e: "mode-change", mode: AuthMode): void;
}>();

const mode = ref<AuthMode>(props.mode ?? AUTH_MODE.SignIn);

const email = ref("");
const password = ref("");
const passwordRepeat = ref("");
const localError = ref("");

function onSubmit() {
  localError.value = "";

  if (
    mode.value === AUTH_MODE.SignUp &&
    password.value !== passwordRepeat.value
  ) {
    localError.value = "Passwords do not match";
    return;
  }

  emit("submit", {
    mode: mode.value,
    email: email.value,
    password: password.value,
  });
}

function switchMode(next: AuthMode) {
  mode.value = next;
  localError.value = "";
}
</script>

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

      <label v-if="mode === 'SignUp'">
        Repeat password
        <input
          v-model="passwordRepeat"
          type="password"
          required
          autocomplete="new-password"
        />
      </label>

      <button :disabled="loading" type="submit">
        {{
          loading ? "Signing in…" : mode === "SignIn" ? "Sign in" : "Sign up"
        }}
      </button>

      <div class="tabs">
        <button
          :class="{ active: mode === 'SignIn' }"
          type="button"
          @click="switchMode('SignIn')"
        >
          Sign in
        </button>
        <button
          :class="{ active: mode === 'SignUp' }"
          type="button"
          @click="switchMode('SignUp')"
        >
          Create account
        </button>
      </div>

      <p v-if="localError" class="error">{{ localError }}</p>
    </form>
  </section>
</template>

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
.tabs {
  display: flex;
  gap: 8px;
}
.tabs .active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
