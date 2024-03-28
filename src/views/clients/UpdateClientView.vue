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
import { toast } from "vuetify-sonner";
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
    this.loadClientData();
  },
};
</script>

<style>
h1 {
  margin: 20px;
}
</style>
