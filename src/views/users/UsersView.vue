<template>
  <v-container>
    <div>
      <h1>Usuarios</h1>
    </div>
    <div class="add-btn">
      <v-tooltip text="Agregar">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="ma-2"
            color="secondary"
            icon="mdi-plus"
            @click="addUser()"
          ></v-btn>
        </template>
      </v-tooltip>
    </div>
    <v-table fixed-header class="styled-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Documento</th>
          <th>Posición</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in users" :key="item._id" class="active-row">
          <td>{{ item.name }}</td>
          <td>{{ item.identification }}</td>
          <td>{{ item.position?.name }}</td>
          <td>
            <v-tooltip text="Editar">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ma-2"
                  color="primary"
                  icon="mdi-pencil"
                  @click="updateUser(item._id)"
                ></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip v-if="item.active" text="Deshabilitar">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ma-2"
                  color="primary"
                  icon="mdi-check-bold"
                  @click="changeUserStatus(item)"
                ></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip v-if="!item.active" text="Habilitar">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ma-2"
                  color="primary"
                  icon="mdi-cancel"
                  @click="changeUserStatus(item)"
                ></v-btn>
              </template>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog v-model="confirmDialog" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        :text="dialogText"
        title="Estado de usuario"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="patchUser()"> SI </v-btn>

          <v-btn @click="confirmDialog = false"> NO </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import router from "@/router";
import { toast } from "vuetify-sonner";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      confirmDialog: false,
      users: [],
      dialogText: "",
    };
  },
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  methods: {
    addUser: function () {
      router.push("/users/add").catch(() => {});
    },
    updateUser: function (id) {
      router.push("/users/" + id).catch(() => {});
    },
    getUsers() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/users?t=" +
            this.sessionToken
        )
        .then((response) => {
          if (response.status === 200) {
            this.users = response.data;
          }
        })
        .catch(() => {});
    },
    changeUserStatus(user) {
      this.selectedUser = user;
      if (user.active) {
        this.dialogText = "¿Está seguro que desea deshabilitar el usuario?";
      } else {
        this.dialogText = "¿Está seguro que desea habilitar el usuario?";
      }
      this.confirmDialog = true;
    },
    patchUser() {
      this.confirmDialog = false;
      let json = {
        name: this.selectedUser.name,
        email: this.selectedUser.email,
        phone: this.selectedUser.phone,
        identification: this.selectedUser.identification,
        active: !this.selectedUser.active,
        position_id: this.selectedUser._position_id,
      };
      this.axios
        .patch(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/users/" +
            this.selectedUser._id +
            "?t=" +
            this.sessionToken,
          json
        )
        .then((userResponse) => {
          this.getUsers();
          let message = "";
          if (userResponse.data.active) {
            message = "El usuario ha sido habilitado exitosamente";
          } else {
            message = "El usuario ha sido deshabilitado exitosamente";
          }

          toast(message, {
            cardProps: {
              color: "success",
              class: "my-toast",
            },
          });
        })
        .catch(() => {});
    },
  },
  beforeMount() {
    this.getUsers();
  },
};
</script>
