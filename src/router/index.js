import DashboardView from '@/views/DashboardView.vue'
import DevicesView from '@/views/DevicesView.vue'
import DownloadView from '@/views/DownloadView.vue'
import WorkspaceView from '@/views/WorkspaceView.vue'
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
      component: DownloadView
    },
    {
      path: '/download/workspace/:workspaceId',
      name: "workspace",
      component: WorkspaceView,
      props: true
    },
  ]
})

export default router
