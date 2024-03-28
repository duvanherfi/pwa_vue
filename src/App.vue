<template>
  <div>
    <layout v-if="sessionToken != null"></layout>
    <login v-if="sessionToken === null"></login>
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
    ...mapGetters(["sessionToken"]),
  },
};
</script>
