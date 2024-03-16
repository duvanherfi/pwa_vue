<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="firstname"
            :counter="10"
            :rules="nameRules"
            label="Nombre Completo"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Contraseña"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="phone"
            :rules="phoneRules"
            label="Teléfono"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="document"
            :rules="documentRules"
            label="Teléfono"
            hide-details
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "UserForm",
  data: () => ({
    valid: false,
    name: "",
    nameRules: [
      (value) => {
        if (value) return true;

        return "El nombre es requerido.";
      },
    ],
    email: "",
    emailRules: [
      (value) => {
        if (value) return true;

        return "E-mail es requerido.";
      },
      (value) => {
        if (/.+@.+\..+/.test(value)) return true;

        return "E-mail must be valid.";
      },
    ],
    password: "",
    passwordRules: [
      (value) => {
        if (value) return true;

        return "La contraseña es requerida.";
      },
    ],
    phone: "",
    phoneRules: [
      (value) => {
        if (value) return true;

        return "El teléfono es requerido.";
      },
    ],
    document: "",
    documentRules: [
      (value) => {
        if (value) return true;

        return "El Documento es requerido.";
      },
    ],
  }),
};
</script>

<style>
h1 {
  margin: 20px;
}

.container {
  max-width: 700px;
}
</style>
