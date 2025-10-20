<script setup lang="ts">
import { ref } from "vue";
import Summarie from "./Summarie.vue";

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
  <section class="h-dvh bg-primary flex items-center justify-center px-4">
    <!-- Outer card wrapper -->
    <div
      class="w-full max-w-4xl rounded-2xl border border-black/10 dark:border-white/10 bg-secondary shadow-xl backdrop-blur overflow-hidden"
    >
      <!-- Two-column layout with responsive divider -->
      <div
        class="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10"
      >
        <!-- Left: mascot -->
        <div class="basis-1/2 flex items-center justify-center p-6 md:p-8">
          <Summarie :size="300" :play-intro="true" />
        </div>

        <!-- Right: login form -->
        <div class="basis-1/2 p-6 md:p-8">
          <!-- Brand / header -->
          <div class="mb-6 text-center">
            <p class="mt-1 text-sm">
              {{
                mode === "SignIn"
                  ? "Sign in to your account"
                  : "Create your account"
              }}
            </p>
          </div>

          <!-- Form -->
          <form class="space-y-4" @submit.prevent="onSubmit" novalidate>
            <!-- Email -->
            <div>
              <label for="email" class="mb-1 block text-sm font-medium">
                Email address
              </label>
              <input
                v-model="email"
                id="email"
                type="email"
                required
                autocomplete="username"
                placeholder="you@example.com"
                class="block w-full rounded-lg border border-black/10 bg-primary px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-secondary/60"
              />
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="mb-1 block text-sm font-medium">
                Password
              </label>
              <input
                v-model="password"
                id="password"
                type="password"
                required
                autocomplete="current-password"
                class="block w-full rounded-lg border border-black/10 bg-primary px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-secondary/60"
              />
            </div>

            <!-- Repeat (signup only) -->
            <div v-if="mode === 'SignUp'">
              <label
                for="passwordRepeat"
                class="mb-1 block text-sm font-medium"
              >
                Repeat password
              </label>
              <input
                v-model="passwordRepeat"
                id="passwordRepeat"
                type="password"
                required
                class="block w-full rounded-lg border border-black/10 bg-primary px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-secondary/60"
              />
            </div>

            <!-- Error -->
            <p
              v-if="localError || error"
              class="text-sm text-red-600 dark:text-red-400"
              aria-live="polite"
            >
              {{ localError || error }}
            </p>

            <!-- Actions -->
            <div class="pt-2">
              <button
                :disabled="loading"
                type="submit"
                class="inline-flex w-full items-center justify-center rounded-lg bg-green px-4 py-2.5 text-sm font-medium text-gray-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary/60 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {{
                  loading
                    ? "Please wait…"
                    : mode === "SignIn"
                    ? "Sign in"
                    : "Create account"
                }}
              </button>
              <div class="mt-3 text-center">
                <button
                  type="button"
                  @click="switchMode(mode === 'SignIn' ? 'SignUp' : 'SignIn')"
                  class="text-sm underline-offset-4 hover:underline"
                >
                  {{
                    mode === "SignIn"
                      ? "Need an account? Sign up"
                      : "Have an account? Sign in"
                  }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
