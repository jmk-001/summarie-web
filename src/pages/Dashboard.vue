<template>
  <section class="dash">
    <header class="row">
      <h2>Dashboard</h2>
      <button @click="logout">Logout</button>
    </header>
    <p>Welcome! You are logged in.</p>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/user.store";
import router from "../router";

const user = useUserStore();
function logout() {
  user.logout();
  router.push("/login");
}
</script>

<style scoped>
.dash {
  max-width: 720px;
  margin: 24px auto;
  padding: 0 12px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
