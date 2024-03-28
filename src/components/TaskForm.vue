<template>
  <v-card>
    <v-form v-model="valid" ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card-text> Id: {{ id }}</v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Nombre"
              required
              @change="dataChange()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-checkbox
              label="Completado"
              v-model="completed"
              @change="dataChange()"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-textarea
              v-model="description"
              :rules="descriptionRules"
              label="Descripción"
              required
              @change="dataChange()"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TaskForm",
  props: ["taskData", "taskIndex", "projectId"],
  data: () => ({
    valid: false,
    id: "",
    name: "",
    nameRules: [
      (value) => {
        if (value) return true;

        return "El nombre es requerido.";
      },
      (value) => {
        if (/^[a-zA-Z\s]*$/.test(value)) return true;

        return "El nombre no es válido.";
      },
    ],
    completed: false,
    add_task_dialog: false,
    description: "",
    descriptionRules: [
      (value) => {
        if (value) return true;

        return "La descripción es requerida.";
      },
      (value) => {
        if (/^[a-zA-Z\s]*$/.test(value)) return true;

        return "La descripción no es válida.";
      },
    ],
  }),
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  methods: {
    setForm() {
      this.id = this.taskData._id;
      this.name = this.taskData.name;
      this.completed = this.taskData.completed;
      this.add_task_dialog = this.taskData.add_task_dialog;
      this.description = this.taskData.description;
    },
    dataChange() {
      let data = {
        _id: this.id,
        name: this.name,
        description: this.description,
        completed: this.completed,
        add_task_dialog: this.add_task_dialog,
      };
      this.$emit("task-event", this.taskIndex, data);
      this.saveTask(data);
    },
    saveTask(data) {
      this.$refs.form.validate();
      if (!this.valid) {
        return;
      }
      this.loadingTask = true;
      if (data._id === "") {
        console.log("AGREGAR");
        this.addTask(data);
      } else {
        console.log("ACTUALIZAR");
        this.updateTask(data);
      }
    },
    addTask(data) {
      this.axios
        .post(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            this.projectId +
            "/tasks?t=" +
            this.sessionToken,
          data
        )
        .then((taskResponse) => {
          this.$emit("task-event", this.taskIndex, taskResponse.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTask(data) {
      this.axios
        .put(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            this.projectId +
            "/tasks/" +
            data._id +
            "?t=" +
            this.sessionToken,
          data
        )
        .then((taskResponse) => {
          this.$emit("task-event", this.taskIndex, taskResponse.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    if (typeof this.taskData !== "undefined") {
      this.setForm();
    }
  },
};
</script>

<style>
.container {
  max-width: 700px;
}
</style>
