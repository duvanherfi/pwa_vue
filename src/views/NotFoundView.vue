<template>
  <h1>Página no encontrada</h1>
  <div class="d-flex justify-space-around align-center">
    <div class="ma-4">
      <v-img
        :aspect-ratio="1"
        class="bg-white"
        src="@/assets/not_found.jpg"
        width="350"
      ></v-img>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "NotFoundView",
});
</script>
