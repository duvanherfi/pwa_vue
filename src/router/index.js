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
    path: "/clients",
    name: "clients",
    component: () => import("../views/clients/ClientsView.vue"),
  },
  {
    path: "/client/add",
    name: "client-add",
    component: () => import("../views/clients/AddClientView.vue"),
  },
  {
    path: "/client/:id",
    name: "client-update",
    props: true,
    component: () => import("../views/clients/UpdateClientView.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("../views/projects/ProjectsView.vue"),
  },
  {
    path: "/projects/add",
    name: "project-add",
    component: () => import("../views/projects/AddProjectView.vue"),
  },
  {
    path: "/projects/:id",
    name: "project-update",
    props: true,
    component: () => import("../views/projects/UpdateProjectView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
