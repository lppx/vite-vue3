import { RouterItem } from '@/utils/interfaces';
/** 静态路由 */
export const staticRoutes: RouterItem[] = [
  {
    path: '/',
    redirect: '/portal',
    component: () => import('@/views/portal/index.vue'),
  },
  {
    path: '/portal',
    component: () => import('@/views/portal/index.vue'),
  },
  {
    path: '/portal/:username',
    component: () => import('@/views/portal/index.vue'),
  },
  {
    path: '/:path(.*)*',
    component: () => import('@/views/404.vue'),
  },
];
