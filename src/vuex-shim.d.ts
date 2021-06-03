import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { ISessionManager } from '@/store/modules/session';
import { IAppState1 } from '@/store/modules/app';
import { IUserState } from '@/store/modules/user';
import { IRpiterTabsState } from '@/store/modules/routerTabs';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    session: ISessionManager;
    app: IAppState1;
    user: IUserState;
    tabs: IRpiterTabsState;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
