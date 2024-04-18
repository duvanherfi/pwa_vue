<template>
  <div>
    <router-view />
    <VSonner position="top-center" expand />
  </div>
</template>

<style></style>
<script>
import { VSonner } from "vuetify-sonner";
export default {
  components: {
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
