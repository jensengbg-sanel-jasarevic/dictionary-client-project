import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/Dictionary/:value',
        name: 'Dictionary',
        component: () => import('../views/Dictionary.vue'),
    },
    {
        path: '/browse/',
        name: 'Browse',
        component: () => import('../views/Browse.vue'),
    },
    {
        path: '/letter/:letter',
        name: 'Letter',
        component: () => import('../views/Letter.vue'),
    },
    {
        path:'/Contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue'),
    },
    {
        path:'/SignUp',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue')
    },
    {
        path:'/Login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes 
  })

  router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem("token");
    if (to.matched.some((route) => route.meta.requiresAuth && !token)) {
      next({ name: "Login" });
    } else {
      next();
    }
  });
  
export default router


