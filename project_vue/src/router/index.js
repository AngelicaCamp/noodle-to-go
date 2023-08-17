import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pedidos from '../views/Pedidos.vue'
import Registro from '../views/Registro.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/novo',
    name: 'Novo',
    component: Registro
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  document.title = to.name;
  next()
})

export default router

