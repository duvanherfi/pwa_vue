<template>
  <v-container>
    <div>
      <h1>Proyectos</h1>
    </div>
    <div class="add-btn">
      <v-tooltip text="Agregar">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="ma-2"
            color="secondary"
            icon="mdi-plus"
            @click="addProject()"
          ></v-btn>
        </template>
      </v-tooltip>
    </div>
    <v-table fixed-header class="styled-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in projects" :key="item._id" class="active-row">
          <td>{{ item.name }}</td>
          <td>
            <v-tooltip text="Editar">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ma-2"
                  color="primary"
                  icon="mdi-pencil"
                  @click="updateProject(item._id)"
                ></v-btn>
              </template>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      projects: [],
    };
  },
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  methods: {
    addProject: function () {
      router.push("/projects/add").catch(() => {});
    },
    updateProject: function (id) {
      router.push("/projects/" + id).catch(() => {});
    },
    getProjects() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects?t=" +
            this.sessionToken
        )
        .then((response) => {
          if (response.status === 200) {
            this.projects = response.data;
          }
        })
        .catch(() => {});
    },
  },
  beforeMount() {
    this.getProjects();
  },
};
</script>
