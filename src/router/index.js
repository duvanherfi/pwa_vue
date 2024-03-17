import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/users/UsersView.vue"),
  },
  {
    path: "/users/add",
    name: "user-add",
    component: () => import("../views/users/AddUserView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
