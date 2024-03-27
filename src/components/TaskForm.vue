<template>
  <v-card>
    <v-form v-model="valid">
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
import { mapState } from "vuex";

export default {
  name: "TaskForm",
  props: ["taskData", "taskIndex"],
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
  computed: mapState(["user"]),
  methods: {
    setForm() {
      this.id = this.taskData._id;
      this.name = this.taskData.name;
      this.completed = this.taskData.completed;
      this.description = this.taskData.description;
    },
    dataChange() {
      let data = {
        _id: this.id,
        name: this.name,
        description: this.description,
        completed: this.completed,
        add_task_dialog: false,
      };
      this.$emit("task-event", this.taskIndex, data);
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
