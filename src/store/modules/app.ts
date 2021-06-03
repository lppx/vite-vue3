import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { SizeEnum } from '@/enums/sizeEnum';
export interface IAppState {
  aa: string;
}

export interface LoadingProps {
  loading: boolean;
  tip?: string;
  size?: SizeEnum;
  delay?: number;
}

@Module({ dynamic: true, store, name: 'app', namespaced: true })
class App extends VuexModule implements IAppState {
  aa: string = '';
  fullLoadingOpt: LoadingProps = {
    loading: false,
    tip: '加载中...',
    size: SizeEnum.LARGE,
    delay: 200,
  };

  @Mutation
  setFullLoading(param: LoadingProps) {
    Object.assign(this.fullLoadingOpt, param);
  }
}

const AppModule = getModule(App);
export default AppModule;
