<template>
  <v-list dense nav>
    <v-list-item v-for="item in items" :key="item.title" link>
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title> {{ item.title }} </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "NavBar",

  data: () => {
    return {
      items: [
        { title: "Users", icon: "mdi-account-tie", path: "/users" },
        { title: "Clients", icon: "mdi-account-circle", path: "/client" },
        { title: "Projects", icon: "mdi-anchor", path: "/project" },
        { title: "Reports", icon: "mdi-chart-bar", path: "/reports" },
      ],
    };
  },
};
</script>
