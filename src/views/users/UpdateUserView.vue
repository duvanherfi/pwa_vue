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
import { mapGetters } from "vuex";

export default {
  components: {
    UserForm,
  },
  props: ["id"],
  data: () => ({
    userData: {},
    isDataLoaded: false,
  }),
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  methods: {
    loadUserData() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/users/" +
            this.id +
            "?t=" +
            this.sessionToken
        )
        .then((response) => {
          if (response.status === 200) {
            this.userData = response.data;
            this.isDataLoaded = true;
          }
        })
        .catch(() => {});
    },
  },
  beforeMount() {
    this.loadUserData();
  },
};
</script>
