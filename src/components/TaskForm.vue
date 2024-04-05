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
        <v-row>
          <v-col cols="6" md="6">
            <v-card-text>Imágenes:</v-card-text>
          </v-col>
          <v-col cols="6" md="6">
            <v-file-input
              ref="imageupload"
              label="Añadir imagen"
              outlined
              dense
              small-ships
              accept="image/*"
              @change="uploadImage($event)"
            >
            </v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="6"
            md="6"
            v-for="(image, i) in images"
            :key="i"
            class="media-col"
          >
            <v-img
              :src="
                'https://api-pwa-building-0e9adbca88d4.herokuapp.com/' +
                image.url
              "
            >
            </v-img>
            <v-tooltip text="Eliminar imagen">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ma-2 rm-media-button"
                  color="red"
                  icon="mdi-close"
                  @click="deleteImage(image._id, i)"
                ></v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" md="6">
            <v-card-text>Audios:</v-card-text>
          </v-col>
          <v-col cols="6" md="6">
            <v-file-input
              ref="audioupload"
              label="Añadir audio"
              outlined
              dense
              small-ships
              accept=".mp3,.mp4,.wav,.aac,.wma"
              @change="uploadAudio($event)"
            >
            </v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="6"
            md="6"
            v-for="(audio, i) in audios"
            :key="i"
            class="media-col"
          >
            <audio
              controls
              :src="
                'https://api-pwa-building-0e9adbca88d4.herokuapp.com/' +
                audio.url
              "
            ></audio>
            <v-tooltip text="Eliminar audio">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="ma-2 rm-media-button"
                  color="red"
                  icon="mdi-close"
                  @click="deleteAudio(audio._id, i)"
                ></v-btn>
              </template>
            </v-tooltip>
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
    ],
    completed: false,
    add_task_dialog: false,
    description: "",
    descriptionRules: [
      (value) => {
        if (value) return true;

        return "La descripción es requerida.";
      },
    ],
    images: [],
    audios: [],
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
      this.images = this.taskData.images;
      this.audios = this.taskData.audios;
    },
    dataChange() {
      let data = this.getTaskInfo();
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
        this.addTask(data);
      } else {
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
        .catch(() => {});
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
        .catch(() => {});
    },
    uploadImage(event) {
      let selectedFile = event.target.files[0];
      const fd = new FormData();
      fd.append("image[file]", selectedFile, selectedFile.name);
      this.axios
        .post(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            this.projectId +
            "/tasks/" +
            this.id +
            "/images?t=" +
            this.sessionToken,
          fd
        )
        .then((imageResponse) => {
          this.images.push({
            _id: imageResponse.data._id,
            url: imageResponse.data.url,
          });
          this.$emit("task-event", this.taskIndex, this.getTaskInfo());
          this.$refs.imageupload.reset();
        })
        .catch(() => {});
    },
    deleteImage(imageId, index) {
      this.axios
        .delete(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            this.projectId +
            "/tasks/" +
            this.id +
            "/images/" +
            imageId +
            "?t=" +
            this.sessionToken
        )
        .then(() => {
          this.images.splice(index, 1);
          this.$emit("task-event", this.taskIndex, this.getTaskInfo());
        })
        .catch(() => {});
    },
    uploadAudio(event) {
      let selectedFile = event.target.files[0];
      const fd = new FormData();
      fd.append("audio[file]", selectedFile, selectedFile.name);
      this.axios
        .post(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            this.projectId +
            "/tasks/" +
            this.id +
            "/audios?t=" +
            this.sessionToken,
          fd
        )
        .then((audioResponse) => {
          this.audios.push({
            _id: audioResponse.data._id,
            url: audioResponse.data.url,
          });
          this.$refs.audioupload.reset();
          this.$emit("task-event", this.taskIndex, this.getTaskInfo());
        })
        .catch(() => {});
    },
    deleteAudio(audioId, index) {
      this.axios
        .delete(
          "https://api-pwa-building-0e9adbca88d4.herokuapp.com/projects/" +
            this.projectId +
            "/tasks/" +
            this.id +
            "/audios/" +
            audioId +
            "?t=" +
            this.sessionToken
        )
        .then(() => {
          this.audios.splice(index, 1);
          this.$emit("task-event", this.taskIndex, this.getTaskInfo());
        })
        .catch(() => {});
    },
    getTaskInfo() {
      return {
        _id: this.id,
        name: this.name,
        description: this.description,
        completed: this.completed,
        add_task_dialog: this.add_task_dialog,
        images: this.images,
        audios: this.audios,
      };
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
.rm-media-button {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
}
.media-col {
  position: relative;
}
</style>
