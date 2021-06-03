import { Router } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import UserModule from '@/store/modules/user';
import router, { updateRolesRoute } from '@/router';
import { toRaw } from 'vue';
// 白名单，未登录用户可以访问
const whiteList = ['/', '/login', '/logout', '/register', '/portal', /\/portal\//i];
function whiteListTest(path: string) {
  return whiteList.some(o => {
    if (o instanceof RegExp) {
      return o.test(path);
    } else {
      return o === path;
    }
  });
}
NProgress.configure({ showSpinner: false }); // NProgress Configuration

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    if (UserModule.getToken) {
      if (UserModule.userId < 0) {
        try {
          await UserModule.GetInfo();
          next({ ...to, replace: true });
        } catch (error) {
          UserModule.FedLogOut().then(() => {
            next({ path: '/' });
          });
        }
      } else {
        next();
      }
    } else {
      if (whiteListTest(to.path)) {
        next();
      } else {
        next({ path: 'login', replace: true });
      }
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
