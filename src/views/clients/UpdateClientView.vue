<template>
  <v-container>
    <div>
      <h1>Actualizar Cliente</h1>
    </div>
    <client-form v-if="isDataLoaded" :user-data="userData" />
  </v-container>
</template>

<script>
import ClientForm from "../../components/ClientForm";
import { mapGetters } from "vuex";

export default {
  components: {
    ClientForm,
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
    loadClientData() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/clients/" +
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
    this.loadClientData();
  },
};
</script>
