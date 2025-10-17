import { ref, onMounted, onBeforeUnmount } from "vue";

export type ThemeMode = "light" | "dark" | "system";
const STORAGE_KEY = "theme";

const mode = ref<ThemeMode>("system");

function apply(modeValue: ThemeMode) {
  const root = document.documentElement;
  if (modeValue === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    root.classList.toggle("dark", prefersDark);
  } else {
    root.classList.toggle("dark", modeValue === "dark");
  }
}

export function useTheme() {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const setTheme = (next: ThemeMode) => {
    mode.value = next;
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  };

  const handleSystemChange = () => {
    if (mode.value === "system") apply("system");
  };

  onMounted(() => {
    const saved =
      (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? "system";
    mode.value = saved;
    apply(saved);
    media.addEventListener?.("change", handleSystemChange);
  });

  onBeforeUnmount(() => {
    media.removeEventListener?.("change", handleSystemChange);
  });

  return { mode, setTheme };
}
