<template>
  <v-container>
    <div>
      <h1>Gestionar proyecto</h1>
    </div>
    <project-form v-if="isDataLoaded" :project-data="projectData" />
  </v-container>
</template>

<script>
import ProjectForm from "../../components/ProjectForm";
import { toast } from "vuetify-sonner";
import { mapState } from "vuex";

export default {
  components: {
    ProjectForm,
  },
  props: ["id"],
  data: () => ({
    projectData: {},
    isDataLoaded: false,
  }),
  computed: mapState(["user"]),
  methods: {
    loadProjectData() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            this.id +
            "?t=" +
            this.user.session_token
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.projectData = response.data;
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
    this.loadProjectData();
  },
};
</script>
