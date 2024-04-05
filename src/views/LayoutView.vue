<template>
  <div>
    <v-app id="inspire">
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Pwa Building</v-app-bar-title>
        <h3>{{ userName }}</h3>
        <v-tooltip text="Cerrar Sesión">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-logout" @click="logout()"></v-btn>
          </template>
        </v-tooltip>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer">
        <nav-bar></nav-bar>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<style></style>
<script>
import NavBar from "@/components/NavBar.vue";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "LayoutView",
  components: { NavBar },
  data: () => ({
    drawer: false,
    userName: "",
  }),
  computed: {
    ...mapGetters(["name"]),
    ...mapGetters(["sessionToken"]),
  },
  mounted() {
    this.userName = this.name;
  },
  methods: {
    ...mapMutations([
      "cleanUserData", // map `this.setUser(user)` to `this.$store.commit('setUser', user)`
    ]),
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
};
</script>
