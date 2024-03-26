<template>
  <div>
    <v-app id="inspire">
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Pwa Building</v-app-bar-title>
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  components: { NavBar },
  data: () => ({
    drawer: false,
  }),
};
</script>
