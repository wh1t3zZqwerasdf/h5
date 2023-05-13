import {RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/schedule',
        name: 'Workbench',
        component: () => import('@/views/workbench/index.vue'),
    },
    {
        path: "/workDetailTrouble",
        name: "WorkDetailTrouble",
        component: () => import("@/views/workbenches/troubleWork/workDetail.vue"),
    },
    {
        path: "/workDetailBreak",
        name: "WorkDetailBreak",
        component: () => import("@/views/workbenches/breakWork/workDetail.vue"),
    },
]
export default routes;
