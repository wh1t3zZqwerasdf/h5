import {RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/workbench',
        name: 'Workbench',
        component: () => import('@/views/workbench/index.vue'),
    },
]
export default routes;
