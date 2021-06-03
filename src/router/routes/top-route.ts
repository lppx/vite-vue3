import AdminMainLayout from '@/layouts/admin/MainLayout.vue';
import { RouterItem } from '@/utils/interfaces';

/** home */
const routesMap: RouterItem[] = [
  {
    path: '/manage',
    component: AdminMainLayout,
    meta: { title: '首页', icon: 'home' },
    children: [
      {
        path: '',
        name: 'manage',
        component: () => import(/* webpackChunkName: "manage" */ '@/views/home/index.vue'),
        meta: { title: '首页', icon: 'home' },
      },
    ],
  },
];

export default routesMap;
