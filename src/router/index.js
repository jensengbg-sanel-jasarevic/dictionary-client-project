import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/dictionary/:search",
    name: "Dictionary",
    component: () => import("../views/Dictionary.vue"),
  },
  {
    path: "/browse/",
    name: "Browse",
    component: () => import("../views/Browse.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: () => import("../views/ChangePassword.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (Store.state.userService.active === false) {
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
    next();
  } else {
    next();
  }
});

export default router;
