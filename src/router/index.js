import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/Dictionary",
    name: "Dictionary",
    component: () => import("../views/Dictionary.vue"),
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  if (to.matched.some((route) => route.meta.requiresAuth && !token)) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
