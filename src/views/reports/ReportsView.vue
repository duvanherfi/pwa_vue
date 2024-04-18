<template>
  <v-container>
    <div>
      <h1>Reportes</h1>
    </div>
    <div>
      <div>
        <br />
        <h3>Cantidad de usuarios de acuerdo a su cargo</h3>
        <BarChart
          v-if="isDataForUsersLoaded"
          :label="userLabels"
          :chart-data="usersDataChart"
        />
      </div>
      <div>
        <br />
        <h3>Cantidad de clientes de acuerdo a su tipo</h3>
        <BarChart
          v-if="isDataForClientsLoaded"
          :label="clientLabels"
          :chart-data="clientsDataChart"
        />
      </div>
      <div>
        <br />
        <h3>Avance del proyecto</h3>
        <br />
        <v-select
          v-model="selectedProject"
          @update:modelValue="dataChange()"
          item-title="name"
          item-value="_id"
          :items="projectList"
          label="Seleccione el proyecto"
          style="width: 50%"
        ></v-select>
        <br />
        <PieChart
          v-if="isDataForProjectsLoaded"
          :label="projectLabels"
          :chart-data="projectsDataChart"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import { mapGetters } from "vuex";
export default {
  data: () => {
    return {
      isDataForUsersLoaded: false,
      isDataForClientsLoaded: false,
      isDataForProjectsLoaded: false,
      userLabels: [],
      usersDataChart: [],
      clientLabels: [],
      clientsDataChart: [],
      projectLabels: [],
      projectsDataChart: [],
      selectedProject: "",
      projectList: [],
    };
  },
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  components: {
    BarChart,
    PieChart,
  },
  methods: {
    getProjects() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects?t=" +
            this.sessionToken
        )
        .then((response) => {
          if (response.status === 200) {
            this.projectList = response.data;
          }
        })
        .catch(() => {});
    },
    getPositionsReport() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/positions/report?t=" +
            this.sessionToken
        )
        .then((response) => {
          if (response.status === 200) {
            this.userLabels = response.data.labels;
            this.usersDataChart = response.data.values;
            this.isDataForUsersLoaded = true;
          }
        })
        .catch(() => {});
    },
    getRolesReport() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/types/report?t=" +
            this.sessionToken
        )
        .then((response) => {
          if (response.status === 200) {
            this.clientLabels = response.data.labels;
            this.clientsDataChart = response.data.values;
            this.isDataForClientsLoaded = true;
          }
        })
        .catch(() => {});
    },
    getTasksReport() {
      this.axios
        .get(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            this.selectedProject +
            "/tasks/report?t=" +
            this.sessionToken
        )
        .then((response) => {
          if (response.status === 200) {
            this.projectLabels = response.data.labels;
            this.projectsDataChart = response.data.values;
            this.isDataForProjectsLoaded = true;
          }
        })
        .catch(() => {});
    },
    dataChange() {
      this.isDataForProjectsLoaded = false;
      this.getTasksReport();
    },
  },
  beforeMount() {
    this.getProjects();
    this.getPositionsReport();
    this.getRolesReport();
  },
};
</script>
