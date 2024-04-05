<template>
  <v-list dense nav>
    <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
      <v-list-item-media>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-media>
      <v-list-item-media>
        <v-list-item-title> {{ item.title }} </v-list-item-title>
      </v-list-item-media>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "NavBar",

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
};
</script>
