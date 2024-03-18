<template>
  <v-container>
    <div>
      <h1>Usuarios</h1>
    </div>
    <div>
      <v-btn
        class="add-btn"
        color="indigo"
        icon="mdi-plus"
        @click="addUser()"
      ></v-btn>
    </div>
    <v-table fixed-header class="styled-table">
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Documento</th>
          <th class="text-left">Posición</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item._id" class="active-row">
          <td>{{ item.name }}</td>
          <td>{{ item.identification }}</td>
          <td>{{ item.position?.name }}</td>
          <td>
            <v-btn class="ma-2" color="indigo" icon="mdi-pencil"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import router from "@/router";
import { toast } from "vuetify-sonner";
import { mapState } from "vuex";

export default {
  data() {
    return {
      users: [],
    };
  },
  computed: mapState(["user"]),
  methods: {
    addUser: function () {
      router.push("/users/add").catch(() => {});
    },
    getUsers() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/users?t=" +
            this.user.session_token
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.users = response.data;
          }
        })
        .catch(function (error) {
          console.log("entrando al catch");
          console.log(error.response);
          toast(error.response.data, {
            cardProps: {
              color: "warning",
              class: "my-toast",
            },
          });
        });
    },
  },
  beforeMount() {
    this.getUsers();
  },
};
</script>

<style>
h1 {
  margin: 20px;
}

.styled-table tbody tr.active-row:hover {
  font-weight: bold;
}
.add-btn {
  margin: 15px;
}
</style>
