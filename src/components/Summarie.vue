<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import lottie, { type AnimationItem } from "lottie-web";

import intro from "../assets/lottie/intro.json";
import blink from "../assets/lottie/blink.json";

const container = ref<HTMLDivElement | null>(null);
let baseAnim: AnimationItem | null = null;
let blinkAnim: AnimationItem | null = null;
let blinkTimer: number | null = null;

function scheduleBlink() {
  const delay = (Math.random() * 5 + 10) * 1000;
  blinkTimer = window.setTimeout(playBlink, delay);
}

function playBlink() {
  if (!container.value) return;

  if (blinkAnim) {
    blinkAnim?.destroy();
    blinkAnim = null;
  }

  if (baseAnim) {
    baseAnim.destroy();
    baseAnim = null;
  }

  blinkAnim = lottie.loadAnimation({
    container: container.value,
    renderer: "svg",
    loop: false,
    autoplay: true,
    animationData: blink,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  });

  blinkAnim.play();

  blinkAnim.addEventListener("complete", () => {
    scheduleBlink();
  });
}

onMounted(() => {
  baseAnim = lottie.loadAnimation({
    container: container.value!,
    renderer: "svg",
    autoplay: true,
    loop: false,
    animationData: intro,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
      progressiveLoad: true,
    },
  });
  baseAnim.play();

  baseAnim.addEventListener("complete", () => {
    scheduleBlink();
  });
});

onBeforeUnmount(() => {
  baseAnim?.destroy();
  blinkAnim?.destroy();
  if (blinkTimer) window.clearTimeout(blinkTimer);
});
</script>

<template>
  <div
    ref="container"
    style="width: 300px; height: 300px; position: relative"
  ></div>
</template>
