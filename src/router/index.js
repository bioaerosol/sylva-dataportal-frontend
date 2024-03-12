import DashboardView from '@/views/DashboardView.vue'
import DevicesView from '@/views/DevicesView.vue'
import Download from '@/views/Download.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: "dashboard",
      component: DashboardView,
    },
    {
      alias: '/',
      path: '/devices',
      name: 'devices',
      component: DevicesView
    },
    {
      path: '/download',
      name: "download",
      component: Download,
    },
  ]
})

export default router
