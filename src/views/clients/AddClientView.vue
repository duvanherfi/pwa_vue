<template>
  <v-container>
    <div>
      <h1>Registrar Cliente</h1>
    </div>
    <client-form />
  </v-container>
</template>

<script>
import ClientForm from "../../components/ClientForm";

export default {
  components: {
    ClientForm,
  },
};</script>

<style>
h1 {
  margin: 20px;
}
</style>
