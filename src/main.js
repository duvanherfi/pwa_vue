import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";
import VueAxios from "vue-axios";
import { toast } from "vuetify-sonner";

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount("#app");

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = "";
    if (error.response.status === 500) {
      message = "Error inesperado";
    } else if (error.response.status < 500) {
      message = error.response.data;
    }

    toast(message, {
      cardProps: {
        color: "warning",
        class: "my-toast",
      },
    });
    if (error.response.status === 401) {
      sessionStorage.setItem("sessionToken", null);
      sessionStorage.setItem("positionId", null);
      sessionStorage.setItem("name", null);
      router.push("/login");
    }

    return Promise.reject(error);
  }
);
