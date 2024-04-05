import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { toast } from "vuetify-sonner";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
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
  {
    path: "/reports",
    name: "reports",
    component: () => import("../views/reports/ReportsView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const isAuthenticated = sessionStorage.getItem("sessionToken") != "";
  if (!isAuthenticated && to.name !== "login") {
    return { name: "login" };
  }

  const positionId = sessionStorage.getItem("positionId");

  if (
    positionId === "65f5dde3adca8f2c313447b9" ||
    positionId === "65f5dde3adca8f2c313447b8"
  ) {
    // Arquitecto - Obrero
    if (to.name != "login" && to.name != "home" && to.name != "projects") {
      toast("No tiene acceso al módulo que intentas ingresar", {
        cardProps: {
          color: "warning",
          class: "my-toast",
        },
      });
      return false;
    }
  } else if (positionId === "65f5dde3adca8f2c313447b7") {
    // Administrador
    if (to.name != "login" && to.name != "reports" && to.name != "clients") {
      toast("No tiene acceso al módulo que intentas ingresar", {
        cardProps: {
          color: "warning",
          class: "my-toast",
        },
      });
      return false;
    }
  }
});

export default router;
