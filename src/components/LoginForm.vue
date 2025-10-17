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
    <form class="flex flex-wrap items-end gap-3" @submit.prevent="onSubmit">
      <div class="flex flex-col">
        <input
          v-model="email"
          id="email"
          type="email"
          required
          autocomplete="username"
          placeholder="Email address"
          class="block rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
        />
      </div>

      <div class="flex flex-col">
        <label for="password" class="sr-only">Password</label>
        <input
          v-model="password"
          id="password"
          type="password"
          required
          autocomplete="current-password"
          placeholder="Password"
          class="block rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="flex flex-col" v-if="mode === 'SignUp'">
        <label for="password" class="sr-only">Password</label>
        <input
          v-model="passwordRepeat"
          id="password"
          type="password"
          required
          placeholder="Repeat password"
          class="block rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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

      <button
        :disabled="loading"
        type="submit"
        class="mb-3 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {{
          loading ? "Signing in…" : mode === "SignIn" ? "Sign in" : "Sign up"
        }}
      </button>

      <p v-if="localError" class="error">{{ localError }}</p>
    </form>
  </section>
</template>
