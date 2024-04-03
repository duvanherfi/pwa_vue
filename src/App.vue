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

<style>
h1 {
  margin: 20px;
  text-align: center;
}

.styled-table tbody tr.active-row:hover {
  font-weight: bold;
}
.add-btn {
  margin: 15px;
  text-align: right;
}
</style>
