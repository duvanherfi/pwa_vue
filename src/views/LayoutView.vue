<template>
  <v-container>
    <v-app id="inspire">
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Building App</v-app-bar-title>
        <h3>{{ userName }}</h3>
        <v-tooltip text="Cerrar Sesión">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-logout" @click="logout()"></v-btn>
          </template>
        </v-tooltip>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer">
        <nav-bar></nav-bar>
        <v-list dense nav>
          <v-list-item size="x-large">
            <v-list-item-media>
              <v-icon>
                {{
                  enableDark ? "mdi-weather-night" : "mdi-white-balance-sunny"
                }}
              </v-icon>
            </v-list-item-media>
            <v-list-item-media>
              <v-list-item-title>
                <v-switch inset color="info" v-model="enableDark"></v-switch>
              </v-list-item-title>
            </v-list-item-media>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </v-container>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { ref } from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "LayoutView",
  components: { NavBar },
  data: () => ({
    drawer: ref(),
    userName: "",
    enableDark: false,
  }),
  computed: {
    ...mapGetters(["name", "sessionToken", "darkMode"]),
  },
  mounted() {
    this.userName = this.name;
  },
  methods: {
    ...mapMutations(["cleanUserData", "setDarkMode"]),
    getDarkMode() {
      this.enableDark = this.darkMode;
      this.$vuetify.theme.global.name = this.enableDark ? "dark" : "light";
    },
    logout() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/logout?t=" +
            this.sessionToken
        )
        .then(() => {
          this.cleanUserData();
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
  watch: {
    enableDark(newValue) {
      this.$vuetify.theme.global.name = newValue ? "dark" : "light";
      this.setDarkMode(newValue);
    },
  },
  beforeMount() {
    this.getDarkMode();
  },
};
</script>
