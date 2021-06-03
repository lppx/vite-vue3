import { RouterItem } from '@/utils/interfaces';
/** 静态路由 */
export const staticRoutes: RouterItem[] = [
  {
    path: '/',
    component: () => import('@/views/portal/index.vue'),
  },
  {
    path: '/:path(.*)*',
    component: () => import('@/views/404.vue'),
  },
];
