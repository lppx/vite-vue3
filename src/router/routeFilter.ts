import { RouterItem } from '@/utils/interfaces';

/** 根据roles过滤路由 route.meta.permission */
export function filterRoutesByRole(arrRouter: RouterItem[], userRoles: string[]) {
  const accessedRouters = arrRouter.filter(route => {
    if (hasPermission(route, userRoles)) {
      if (route.children && route.children.length > 0) {
        route.children = route.children.filter(child => {
          if (hasPermission(child, userRoles)) {
            return child;
          }
          // console.log('无权限子路由', child)
          return false;
        });
        // console.log('filter end', route)
        return route;
      }
      return route;
    }
    return hasPermission(route, userRoles);
  });
  // console.log('accessedRouters', accessedRouters)
  return accessedRouters;
}

function hasPermission(route: RouterItem, roles: string[]) {
  //excludes的路由
  if (route.meta && route.meta.excludes) {
    const permission = route.meta.excludes;
    if (Array.isArray(permission)) {
      return !(permission as string[]).some(o => roles.includes(o));
    }
  }

  if (route.meta && route.meta.authorize) {
    const permission = route.meta.authorize;
    // console.log(`%c ${route.meta.title}设置的权限---${permission}`, 'color:red')
    if (Array.isArray(permission)) {
      return (permission as string[]).some(o => roles.indexOf(o) >= 0);
    }

    if (typeof permission === 'function') {
      const r = permission.apply(null);
      return r;
    }
    return false;
  }
  return true;
}
