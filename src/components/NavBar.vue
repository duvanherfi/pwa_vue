<template>
  <v-list dense nav>
    <div v-for="item in items" :key="item.title">
      <v-list-item v-if="canNavigate(item.path)" link :to="item.path">
        <v-list-item-media>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-media>
        <v-list-item-media>
          <v-list-item-title> {{ item.title }} </v-list-item-title>
        </v-list-item-media>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["positionId"]),
  },
  data: () => {
    return {
      items: [
        { title: "Inicio", icon: "mdi-home", path: "/home" },
        { title: "Usuarios", icon: "mdi-account-tie", path: "/users" },
        { title: "Clientes", icon: "mdi-account-circle", path: "/clients" },
        { title: "Proyectos", icon: "mdi-anchor", path: "/projects" },
        { title: "Reportes", icon: "mdi-chart-bar", path: "/reports" },
      ],
    };
  },
  methods: {
    canNavigate(path) {
      // Arquitecto - Obrero
      if (
        this.positionId === "65f5dde3adca8f2c313447b9" ||
        this.positionId === "65f5dde3adca8f2c313447b8"
      ) {
        if (path != "/login" && path != "/home" && path != "/projects") {
          return false;
        }
      } else if (this.positionId === "65f5dde3adca8f2c313447b7") {
        // Administrador
        if (
          path != "/login" &&
          path != "/home" &&
          path != "/reports" &&
          path != "/clients"
        ) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>
