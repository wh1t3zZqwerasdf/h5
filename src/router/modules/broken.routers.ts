import {RouteRecordRaw} from 'vue-router';

const routes:Array<RouteRecordRaw>=[
  {
    path: '/broken',
    name: 'Broken',
    component: () =>
      import('@/views/trouble-broken/broken.vue'),
  },
  {
    path: '/brokenAdd',
    name: 'BrokenAdd',
    component: () =>
      import('@/views/trouble-broken/brokenAdd.vue'),
  },
  {
    path: '/brokenDetail',
    name: 'BrokenDetail',
    component: () =>
      import('@/views/trouble-broken/brokenDetail.vue'),
  },
  {
    path: '/brokenDrafts',
    name: 'BrokenDrafts',
    component: () =>
      import('@/views/trouble-broken/emitListBroken.vue'),
  }
]

export default routes