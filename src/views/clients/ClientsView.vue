<template>
  <v-container>
    <div>
      <h1>Clientes</h1>
    </div>
    <div>
      <v-btn
        class="add-btn"
        color="indigo"
        icon="mdi-plus"
        @click="addClient()"
      ></v-btn>
    </div>
    <v-table fixed-header class="styled-table">
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Documento</th>
          <th class="text-left">Tipo</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in clients" :key="item._id" class="active-row">
          <td>{{ item.name }}</td>
          <td>{{ item.identification }}</td>
          <td>{{ item.type?.name }}</td>
          <td>
            <v-btn
              class="ma-2"
              color="indigo"
              icon="mdi-pencil"
              @click="updateClient(item._id)"
            ></v-btn>
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
      clients: [],
      loading: true,
    };
  },
  computed: mapState(["user"]),
  methods: {
    addClient: function () {
      router.push("client/add").catch(() => {});
    },
    updateClient: function (id) {
      router.push("/client/" + id).catch(() => {});
    },
    getClients() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/clients?t=" +
            this.user.session_token
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.clients = response.data;
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
    this.getClients();
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
