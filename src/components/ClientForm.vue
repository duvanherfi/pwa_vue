<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Nombre Completo"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            type="email"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="phone"
            :rules="phoneRules"
            label="Teléfono"
            type="phone"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="identification"
            :rules="identificationRules"
            label="Documento"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="type"
            item-title="name"
            item-value="_id"
            :items="types"
            label="Tipo"
            :rules="typeRules"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8"> </v-col>
        <v-col cols="12" md="2">
          <v-btn @click="gotoClients()">Cancelar</v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn color="primary" @click="saveClient()" type="submit"
            >Guardar</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import router from "@/router";
import { toast } from "vuetify-sonner";
import { mapGetters } from "vuex";

export default {
  name: "ClientForm",
  props: ["userData"],
  data: () => ({
    types: [],
    valid: false,
    name: "",
    nameRules: [
      (value) => {
        if (value) return true;

        return "El nombre es requerido.";
      },
      (value) => {
        if (/^[a-zA-Z\s]*$/.test(value)) return true;

        return "El nombre no es válido.";
      },
    ],
    email: "",
    emailRules: [
      (value) => {
        if (value) return true;

        return "El e-mail es requerido.";
      },
      (value) => {
        if (/.+@.+\..+/.test(value)) return true;

        return "El E-mail no es válido.";
      },
    ],
    phone: "",
    phoneRules: [
      (value) => {
        if (value) return true;

        return "El teléfono es requerido.";
      },
      (value) => {
        if (/^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/.test(value))
          return true;

        return "El teléfono no es válido.";
      },
    ],
    identification: "",
    identificationRules: [
      (value) => {
        if (value) return true;

        return "El Documento es requerido.";
      },
      (value) => {
        if (/^[0-9]*$/.test(value)) return true;

        return "El Documento no es válido.";
      },
    ],
    type: "",
    typeRules: [
      (value) => {
        if (value) return true;

        return "La posición es requerida.";
      },
    ],
  }),
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  methods: {
    setForm() {
      this.name = this.userData.name;
      this.email = this.userData.email;
      this.phone = this.userData.phone;
      this.identification = this.userData.identification;
      this.type = this.userData?.type?._id;
    },
    getTypes() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/types?t=" +
            this.sessionToken
        )
        .then((response) => {
          if (response.status === 200) {
            this.types = response.data;
          }
        })
        .catch(function () {});
    },
    gotoClients() {
      router.push({ path: "/clients" }).catch(() => {});
    },
    saveClient() {
      if (typeof this.userData !== "undefined") {
        this.updateClient();
      } else {
        this.addClient();
      }
    },
    addClient() {
      let json = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
        identification: this.identification,
        type_id: this.type,
      };
      this.axios
        .post(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/clients?t=" +
            this.sessionToken,
          json
        )
        .then(() => {
          this.successOperation("creado");
          this.gotoClients();
        })
        .catch(() => {});
    },
    updateClient() {
      let json = {
        _id: this.userData._id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        identification: this.identification,
        type_id: this.type,
      };
      this.axios
        .put(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/clients/" +
            json._id +
            "?t=" +
            this.sessionToken,
          json
        )
        .then((response) => {
          this.name = response.data.name;
          this.email = response.data.email;
          this.phone = response.data.phone;
          this.identification = response.data.identification;
          this.type = response.data?.type?._id;
          this.successOperation("actualizado");
        })
        .catch(() => {});
    },
    successOperation(operation) {
      toast("El cliente ha sido " + operation + " exitosamente", {
        cardProps: {
          color: "success",
          class: "my-toast",
        },
      });
    },
  },
  beforeMount() {
    if (typeof this.userData !== "undefined") {
      this.setForm();
    }
    this.getTypes();
  },
};
</script>

<style>
.container {
  max-width: 700px;
}
</style>
