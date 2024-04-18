<template>
  <v-container>
    <v-row align="center" no-gutters>
      <v-col>
        <v-card
          class="mb-6 mx-auto"
          max-width="200"
          rounded="lg"
          color="surface-bright"
        >
          <v-img
            class="mx-auto my-6"
            width="auto"
            src="@/assets/logo.svg"
            dark
            elevation="8"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" no-gutters>
      <v-col>
        <v-card class="mx-auto" elevation="8" max-width="1000" rounded="lg">
          <v-toolbar dark color="primary">
            <v-toolbar-title align="center">Inicio de sesión</v-toolbar-title>
          </v-toolbar>
          <V-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account-circle "
                type="email"
                placeholder="example@example.com"
                v-model="email"
                label="Correo"
                autocomplete="email"
                :rules="emailRules"
                clearable
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                label="Contraseña"
                v-model="password"
                autocomplete="current-password"
                :rules="passwordRules"
                clearable
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              ></v-text-field>
              <v-switch
                inset
                color="info"
                v-model="enableDark"
                :label="`Modo oscuro ${
                  enableDark ? 'activado' : 'desactivado'
                }`"
              ></v-switch>
            </v-form>
          </V-card-text>
          <V-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="primary"
              @click="login"
              :disabled="request"
              block
              size="large"
              variant="tonal"
            >
              Iniciar sesión
            </v-btn>
          </V-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      enableDark: null,
      email: "",
      password: "",
      request: false,
      show: false,
      emailRules: [
        (value) => {
          if (value) return true;

          return "El correo es requerido.";
        },
        (value) => {
          if (/.+@.+\..+/.test(value)) return true;

          return "El correo no es válido.";
        },
      ],
      passwordRules: [
        (value) => {
          if (value) return true;

          return "La contraseña es requerida.";
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["darkMode"]),
  },
  methods: {
    ...mapMutations(["setUserData", "setDarkMode"]),
    login() {
      this.request = true;
      let json = {
        email: this.email,
        password: this.password,
      };
      this.axios
        .post("https://api-pwa-building-0e9adbca88d4.herokuapp.com/login", json)
        .then((response) => {
          if (response.status === 200) {
            this.setUserData(response.data);
            this.$router.push("/home");
          }
        })
        .catch(() => {});
      this.request = false;
    },
    getDarkMode() {
      this.enableDark = this.darkMode;
    },
  },
  watch: {
    enableDark(newValue) {
      this.$vuetify.theme.global.name = newValue ? "dark" : "light";
      this.setDarkMode(newValue);
    },
  },
  beforeMount() {
    this.getDarkMode();
  },
};
</script>
