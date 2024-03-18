import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
  {
    path: "/users/:id",
    name: "user-update",
    props: true,
    component: () => import("../views/users/UpdateUserView.vue"),
  },
  {
    path: "/client",
    name: "client",
    component: () => import("../views/clients/ClientsView.vue"),
  },
  {
    path: "/client/add",
    name: "client-add",
    component: () => import("../views/clients/AddClientView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
