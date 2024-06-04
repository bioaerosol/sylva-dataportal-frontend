import DashboardView from '@/views/DashboardView.vue'
import DeviceView from '@/views/DeviceView.vue'
import LocationsView from '@/views/LocationsView.vue'
import DownloadView from '@/views/DownloadView.vue'
import WorkspaceView from '@/views/WorkspaceView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ReferenceDatasetsView from '@/views/ReferenceDatasetsView.vue'
import AlgorithmsView from '../views/AlgorithmsView.vue'
import AlgorithmRunView from '@/views/AlgorithmRunView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      alias: '/',
      path: '/dashboard',
      name: "dashboard",
      component: DashboardView,
    },
    {
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
      path: '/referenceDatasets',
      name: "referenceDatasets",
      component: ReferenceDatasetsView
    },
    {
      path: '/algorithms',
      name: "algorithms",
      component: AlgorithmsView
    },
    {
      path: '/algorithms/run/:runOrderId/:runId',
      name: "algorithmRun",
      component: AlgorithmRunView,
      props: true
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
