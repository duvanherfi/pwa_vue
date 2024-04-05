<template>
  <div>
    <layout></layout>
    <VSonner position="top-center" expand />
  </div>
</template>

<style></style>
<script>
import Layout from "@/components/Layout.vue";
import { VSonner } from "vuetify-sonner";
export default {
  components: {
    Layout,
    VSonner,
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
