<template>
  <v-container>
    <div>
      <h1>Actualizar Usuario</h1>
    </div>
    <user-form v-if="isDataLoaded" :user-data="userData" />
  </v-container>
</template>

<script>
import UserForm from "../../components/UserForm";
import { toast } from "vuetify-sonner";
import { mapState } from "vuex";

export default {
  components: {
    UserForm,
  },
  props: ["id"],
  data: () => ({
    userData: {},
    isDataLoaded: false,
  }),
  computed: mapState(["user"]),
  methods: {
    loadUserData() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/users/" +
            this.id +
            "?t=" +
            this.user.session_token
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.userData = response.data;
            this.isDataLoaded = true;
          }
        })
        .catch(function (error) {
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
    this.loadUserData();
  },
};
</script>

<style>
h1 {
  margin: 20px;
}
</style>
