<template>
  <v-container>
    <div>
      <h1>Agregar Usuario</h1>
    </div>
    <user-form />
  </v-container>
</template>

<script>
import UserForm from "../../components/UserForm";

export default {
  components: {
    UserForm,
  },
};
</script>
