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
        path: '/Dictionary',
        name: 'Dictionary',
        component: () => import('../views/Dictionary.vue')
    },
    {
        path:'/Contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue')
    }
]

const router = new VueRouter({
    routes 
  })
  
export default router


