import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { staticRoutes } from './constant';
import { createGuard } from './guard';
import { RouterItem } from '@/utils/interfaces';
import { filterRoutesByRole } from './routeFilter';
import dynamicRoutes from './routes';
const router = createRouter({
  history: createWebHistory(),
  routes: (staticRoutes.concat(...dynamicRoutes) as unknown) as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**  DynamicRoutes -> filter by userRoles =  userDynamicRoutes */
const userDynamicRoutes: RouterItem[] = [];
export function updateRolesRoute(roels?: string[]): RouterItem[] {
  userDynamicRoutes.splice(0, userDynamicRoutes.length);
  // TODO: filter routes
  if (roels) {
    const filtedRoute = filterRoutesByRole(dynamicRoutes, roels!);
    userDynamicRoutes.push(...filtedRoute);
  }
  // userDynamicRoutes.push({ path: '*', redirect: '/404' });
  userDynamicRoutes.push({ path: '/:pathMatch(.*)*', meta: { title: '', hidden: true }, redirect: '/404' });
  return userDynamicRoutes;
}

export function getMenuRoutes() {
  return userDynamicRoutes.concat(...staticRoutes);
}

export { userDynamicRoutes };

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}

export default router;
