<script setup lang="ts">
import { useSummaryFlow } from "../composables/useSummaryFlow";
import ContentInput from "./ContentInput.vue";
import ContentOutput from "./ContentOutput.vue";

const { loading, outputOpened, latestSummary, run, reset, error } =
  useSummaryFlow();

async function onSubmitContent(payload: { content: string }) {
  try {
    await run(payload.content);
  } catch {
    console.error(error.value);
  }
}
</script>

<template>
  <!-- Fill parent, vertical layout -->
  <section class="content-io flex h-full flex-col min-h-0">
    <!-- Card wrapper -->
    <div
      class="w-full h-full rounded-2xl border border-black/10 dark:border-white/10 bg-secondary shadow-xl backdrop-blur overflow-hidden"
    >
      <!-- Responsive layout: stack on mobile, 2 columns from md up -->
      <div
        class="grid h-full min-h-0 grid-rows-[1fr_1fr] md:grid-rows-1 md:grid-cols-2"
      >
        <!-- LEFT: Input panel -->
        <div
          class="min-h-0 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 px-[1%]"
        >
          <div class="flex h-full flex-col p-4 md:p-6 lg:p-8 min-h-0">
            <!-- Make panel content scroll when needed -->
            <div class="flex-1 min-h-0 overflow-auto">
              <ContentInput :loading="loading" @submit="onSubmitContent" />
            </div>
          </div>
        </div>

        <!-- RIGHT: Output panel -->
        <div class="min-h-0">
          <div
            class="flex h-full flex-col p-4 pt-[100px] md:p-6 md:pt-[100px] lg:p-8 lg:pt-[100px] min-h-0"
          >
            <div class="flex-1 min-h-0 overflow-auto">
              <ContentOutput
                :output-opened="outputOpened"
                :content="latestSummary"
                @close="reset"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error row lives outside the card -->
    <p
      v-if="error"
      class="mt-2 text-sm text-red-600 dark:text-red-400"
      aria-live="polite"
    >
      {{ error.message }}
    </p>
  </section>
</template>
