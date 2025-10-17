import { createApp, h, provide } from "vue";
import { pinia } from "./stores";
import App from "./App.vue";
import router from "./router";
import { apolloClient } from "./services/graphql/apollo-client";
import { DefaultApolloClient } from "@vue/apollo-composable";
import "./index.css";
import "./assets/tailwind.css";

export const apolloProvider = {
  provide: {
    [DefaultApolloClient]: apolloClient,
  },
};

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(pinia);
app.use(router);
app.mount("#app");
