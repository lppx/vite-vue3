import type { App } from 'vue';
import { createStore } from 'vuex';
import { IAppState } from './modules/app';
import { IUserState } from './modules/user';

export interface IRootState {
  app: IAppState;
  user: IUserState;
}

const store = createStore<IRootState>({});
export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
