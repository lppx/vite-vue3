import AdminMainLayout from '@/layouts/admin/MainLayout.vue';
import { RouterItem } from '@/utils/interfaces';

/** user ms */
const routesMap: RouterItem[] = [
  {
    path: '/user',
    component: AdminMainLayout,
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'a',
        name: 'manage-a',
        component: () => import(/* webpackChunkName: "manage" */ '@/views/home/index.vue'),
        meta: { title: '用户管理1', icon: 'user' },
      },
      {
        path: 'b',
        name: 'user-b',
        component: () => import(/* webpackChunkName: "manage" */ '@/views/home/index.vue'),
        meta: { title: '用户管理2', icon: 'user', authorize: ['admin'] },
      },
    ],
  },
];

export default routesMap;
