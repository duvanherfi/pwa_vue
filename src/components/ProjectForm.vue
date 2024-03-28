<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="6" md="6">
          <v-text-field
            v-model="name"
            :loading="loadingProject"
            :rules="nameRules"
            label="Nombre de proyecto"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6">
          <v-tooltip text="Guardar">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="ma-2"
                color="primary"
                icon="mdi-send"
                type="submit"
                @click="saveProject()"
              ></v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-card elevation="16">
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card-item>
              <v-tooltip text="Agregar tarea">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    class="ma-2"
                    color="primary"
                    @click="addTask()"
                    :disabled="id === ''"
                    >Agregar Tarea</v-btn
                  >
                </template>
              </v-tooltip>
            </v-card-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(task, i) in tasks"
            :key="task._id"
            cols="6"
            md="6"
            class="task-col"
          >
            <v-tooltip text="Eliminar">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ma-2 rm-button"
                  color="indigo"
                  icon="mdi-close"
                  @click="removeTask(i)"
                ></v-btn>
              </template>
            </v-tooltip>
            <task-form
              :task-data="task"
              :task-index="i"
              :project-id="id"
              @task-event="cardEventHandler"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import TaskForm from "./TaskForm.vue";
import router from "@/router";
import { toast } from "vuetify-sonner";
import { mapGetters } from "vuex";

export default {
  name: "ProjectForm",
  components: {
    TaskForm,
  },
  props: ["projectData"],
  data: () => ({
    loadingProject: false,
    valid: false,
    id: "",
    name: "",
    nameRules: [
      (value) => {
        if (value) return true;

        return "El nombre es requerido.";
      },
    ],
    tasks: [],
    tempTaskIdCounter: 0,
  }),
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  methods: {
    setForm() {
      this.id = this.projectData._id;
      this.name = this.projectData.name;
      this.tasks = this.projectData.tasks;
    },
    addTask() {
      let newTask = {
        _id: "",
        name: "",
        description: "",
        completed: false,
        add_task_dialog: false,
      };
      this.tasks.unshift(newTask);
    },
    removeTask(index) {
      if (this.tasks[index]._id === "") {
        this.tasks.splice(index, 1);
      } else {
        this.axios
          .delete(
            "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
              this.id +
              "/tasks/" +
              this.tasks[index]._id +
              "?t=" +
              this.sessionToken
          )
          .then(() => {
            this.tasks.splice(index, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    gotoProjects() {
      router.push({ path: "/projects" }).catch(() => {});
    },
    saveProject() {
      this.$refs.form.validate();
      if (!this.valid) {
        return;
      }
      this.loadingProject = true;
      if (typeof this.projectData !== "undefined") {
        this.updateProject();
      } else {
        this.addProject();
      }
    },
    addProject() {
      let json = {
        name: this.name,
      };
      this.axios
        .post(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects?t=" +
            this.sessionToken,
          json
        )
        .then((projectResponse) => {
          this.successOperation("creado", projectResponse);
        })
        .catch((error) => {
          this.errorOperation(error);
        });
    },
    updateProject() {
      let json = {
        _id: this.projectData._id,
        name: this.name,
      };
      this.axios
        .put(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            json._id +
            "?t=" +
            this.sessionToken,
          json
        )
        .then((projectResponse) => {
          this.successOperation("actualizado", projectResponse);
        })
        .catch((error) => {
          this.errorOperation(error);
        });
    },
    successOperation(operation, projectResponse) {
      this.loadingProject = false;
      this.id = projectResponse.data._id;
      toast("El proyecto ha sido " + operation + " exitosamente", {
        cardProps: {
          color: "success",
          class: "my-toast",
        },
      });
    },
    errorOperation(error) {
      this.loadingProject = false;
      console.log("error" + error);
      toast(error.response.data, {
        cardProps: {
          color: "warning",
          class: "my-toast",
        },
      });
    },
    cardEventHandler(index, data) {
      this.tasks[index] = data;
    },
  },
  beforeMount() {
    if (typeof this.projectData !== "undefined") {
      this.setForm();
    }
  },
};
</script>

<style>
.container {
  max-width: 700px;
}

.rm-button {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
}
.task-col {
  position: relative;
}
</style>
