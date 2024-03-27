<template>
  <v-container>
    <div>
      <h1>Agregar Proyecto</h1>
    </div>
    <project-form />
  </v-container>
</template>

<script>
import ProjectForm from "../../components/ProjectForm";

export default {
  components: {
    ProjectForm,
  },
};
</script>
