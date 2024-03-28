<template>
  <v-container>
    <div>
      <h1>Clientes</h1>
    </div>
    <div class="add-btn">
      <v-tooltip text="Agregar">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="ma-2"
            color="indigo"
            icon="mdi-plus"
            @click="addClient()"
          ></v-btn>
        </template>
      </v-tooltip>
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      clients: [],
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["sessionToken"]),
  },
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
            this.sessionToken
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
