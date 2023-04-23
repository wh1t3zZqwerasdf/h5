import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import workPathRouters from "@/router/modules/workPath.routers";

const routes: Array<RouteRecordRaw> = [
    ...workPathRouters,
    {
        path: '/test',
        name: 'Test',
        component: () => import('@/test/Test.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/login/Login.vue'),
    },
    {
        path: '/report',
        name: 'ReportTab',
        component: () => import('@/components/report/new/ReportTab.vue'),
    },
    {
        path: '/hidLine',
        name: 'HidLine',
        component: () => import('@/components/hid/HidLine.vue'),
    },
    {
        path: '/publishHid',
        name: 'PublishHid',
        component: () => import('@/components/hid/PublishHid.vue'),
    },
    {
        path: '/hidTab',
        name: 'HidTab',
        component: () => import('@/components/hid/HidTab.vue'),
    },
    {
        path: '/publishExter',
        name: 'PublishExter',
        component: () => import('@/components/exter/PublishExter.vue'),
    },
    {
        path: '/exterLine',
        name: 'ExterLine',
        component: () => import('@/components/exter/ExterLine.vue'),
    },
    {
        path: '/reportLineNew',
        name: 'ReportLineNew',
        component: () => import('@/components/report/new/ReportLineNew.vue'),
    },
    {
        path: '/publishReportNew',
        name: 'PublishReportNew',
        component: () => import('@/components/report/new/PublishReportNew.vue'),
    },
    {
        path: '/spotCheckAudit',
        name: 'SpotCheckAudit',
        component: () =>
            import(
                '@/components/protect/spot-check-task-line/SpotCheckAudit.vue'
                ),
    },
    {
        path: '/spotCheckAuditLine',
        name: 'SpotCheckAuditLine',
        component: () =>
            import(
                '@/components/protect/spot-check-task-line/SpotCheckAuditLine.vue'
                ),
    },
    {
        path: '/newLine',
        name: 'NewLine',
        component: () => import('@/components/news/NewLine.vue'),
    },
    {
        path: '/apparitor',
        name: 'apparitor',
        component: () => import('@/components/apparitor/apparitor.vue'),
    },
    {
        path: '/home',
        name: 'homePage',
        component: () => import('@/views/homePage/homePage.vue'),
    },
    {
        path: '/workbenches',
        name: 'workbenches',
        component: () => import('@/views/workbenches/workbenches.vue'),
        children: [],
    },
    {
        path: '/schedule',
        name: 'schedule',
        component: () => import('@/views/schedule/schedule.vue'),
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('@/views/userInfo/userPage.vue'),
    },
    {
        path: '/internalNews',
        name: 'internalNews',
        component: () => import('@/views/news/internalNews.vue'),
    },
    {
        path: '/externalNews',
        name: 'externalNews',
        component: () => import('@/views/news/externalNews.vue'),
    },
    {
        path: '/newsList',
        name: 'newsList',
        component: () => import('@/views/news/newsList.vue'),
    },
    {
        path: '/subordinateNews',
        name: 'subordinateNews',
        component: () => import('@/views/news/subordinateNews.vue'),
    },
    {
        path: '/editNews',
        name: 'editNews',
        component: () => import('@/views/news/editNews.vue'),
    },
    {
        path: '/newsDetail/:id',
        name: 'newsDetail',
        component: () => import('@/views/news/newsDetail.vue'),
    },
    {
        path: '/formily',
        name: 'Formily',
        component: () => import('@/views/formily/test.vue'),
    },
    {
        path: '/testCard',
        name: 'TestCard',
        component: () => import('@/views/testCard/testCard.vue'),
    },
    {
        path: '/troubleList',
        name: 'TroubleList',
        component: () =>
            import('@/views/trouble-broken/trouble/troubleList.vue'),
    },
    {
        path: '/troubleListAdd',
        name: 'TroubleListAdd',
        component: () =>
            import('@/views/trouble-broken/trouble/troubleListAdd.vue'),
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes,
});

export default router;
