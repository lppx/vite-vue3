import { LoadingProps } from '@/store/modules/app';
import appModule from '@/store/modules/app';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
interface Fn {
  (): void;
}
NProgress.configure({ showSpinner: true }); // NProgress Configuration
export function useLoading(opt?: LoadingProps): [Fn, Fn];
export function useLoading(opt?: LoadingProps): [Fn, Fn] {
  const open = (): void => {
    NProgress.start();
    if (opt) {
      opt.loading = true;
      appModule.setFullLoading(Object.assign({}, opt));
    } else {
      appModule.setFullLoading({ loading: true });
    }
  };

  const close = (): void => {
    if (opt) {
      opt.loading = false;
      appModule.setFullLoading(Object.assign({}, opt));
    } else {
      appModule.setFullLoading({ loading: false });
    }
    NProgress.done();
  };

  return [open, close];
}
