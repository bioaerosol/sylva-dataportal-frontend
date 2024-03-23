import DashboardView from '@/views/DashboardView.vue'
import DeviceView from '@/views/DeviceView.vue'
import LocationsView from '@/views/LocationsView.vue'
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
      path: '/locations',
      name: 'locations',
      component: LocationsView
    },
    {
      path: '/devices/:deviceId',
      name: 'device',
      component: DeviceView,
      props: true
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
