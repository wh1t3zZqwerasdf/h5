import {RouteRecordRaw} from 'vue-router';

const routes:Array<RouteRecordRaw>=[
  {
    path: '/trouble',
    name: 'Trouble',
    component: () =>
      import('@/views/trouble-broken/trouble.vue'),
  },
  {
    path: '/troubleAdd',
    name: 'TroubleAdd',
    component: () =>
      import('@/views/trouble-broken/troubleAdd.vue'),
  },
  {
    path: '/troubles/:id',
    name: 'TroubleDetail',
    component: () =>
      import('@/views/trouble-broken/troubleDetail.vue'),
  },
  {
    path: '/troubleDrafts',
    name: 'TroubleDrafts',
    component: () =>
      import('@/views/trouble-broken/TroubleEmitListReport.vue'),
  },
]

export default routes