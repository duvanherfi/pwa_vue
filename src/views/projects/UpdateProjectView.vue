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
import { mapGetters } from "vuex";

export default {
  components: {
    ProjectForm,
  },
  props: ["id"],
  data: () => ({
    projectData: {},
    isDataLoaded: false,
  }),
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  methods: {
    loadProjectData() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            this.id +
            "?t=" +
            this.sessionToken
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.projectData = response.data;
            this.isDataLoaded = true;
          }
        })
        .catch(() => {});
    },
  },
  beforeMount() {
    this.loadProjectData();
  },
};
</script>
