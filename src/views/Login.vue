<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-card class="elevation-12 mx-auto" width="30%">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <V-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-account-circle "
            type="email"
            placeholder="Email"
            v-model="email"
            autocomplete="email"
          ></v-text-field>
          <v-text-field
            id="password"
            prepend-icon="mdi-lock"
            type="password"
            placeholder="Contraseña"
            v-model="password"
            autocomplete="current-password"
          ></v-text-field>
        </v-form>
      </V-card-text>
      <V-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login">Iniciar sesión</v-btn>
      </V-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { toast } from "vuetify-sonner";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",

  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations([
      "setUser", // map `this.setUser(user)` to `this.$store.commit('setUser', user)`
    ]),
    login() {
      let json = {
        email: this.email,
        password: this.password,
      };
      this.axios
        .post("https://api-pwa-building-0e9adbca88d4.herokuapp.com/login", json)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.setUser(response.data);
            this.$router.push("/users");
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
};
</script>
