<template>
  <div>
    <layout v-if="currentUser != null"></layout>
    <login v-if="currentUser === null"></login>
    <VSonner position="top-center" expand />
  </div>
</template>

<style></style>
<script>
import Layout from "@/components/Layout.vue";
import Login from "@/views/Login.vue";
import { mapGetters } from "vuex";
import { VSonner } from "vuetify-sonner";
export default {
  components: {
    Layout,
    Login,
    VSonner,
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
};
</script>
