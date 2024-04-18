<template>
  <h1>Bienvenid@ {{ userName }} !!</h1>
  <div class="d-flex justify-space-around align-center">
    <div class="ma-4 mx-auto">
      <v-img
        :aspect-ratio="1"
        src="@/assets/home_image.png"
        width="350"
      ></v-img>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

// Components

export default defineComponent({
  name: "HomeView",
  data: () => {
    return {
      userName: "",
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  mounted() {
    this.userName = this.name;
  },
});
</script>
