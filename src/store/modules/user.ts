import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';

import store from '@/store';
import * as api from '@/api';
import router, { updateRolesRoute } from '@/router';
import { message } from 'ant-design-vue';
export interface IUserState {
  token: string | null;
  userName: string;
  email: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: 'user', namespaced: true })
class User extends VuexModule implements IUserState {
  /** token, 请用 UserModule.token 获取 */
  public token: string | null = '';
  public userId: number = -1;
  public userName: string = '';
  public email: string = '';
  public roles: string[] = [];

  /** 用户登录  */
  @Action({ commit: 'SET_TOKEN' })
  public async Login(userInfo: { userName: string; password: string }) {
    let T: any = null;
    try {
      const res = await api.Base.login_POST({ userName: userInfo.userName, password: userInfo.password });
      T = res.data!;
    } finally {
      return T;
    }
  }

  /** 获取用户详细信息，保存到vuex */
  @MutationAction({ mutate: ['roles', 'userName', 'userId', 'token', 'email'] })
  public async GetInfo() {
    const token = UserModule.getToken;
    if (token === undefined) {
      throw Error('GetInfo: token is undefined!');
    }
    const O = {
      userId: -1,
      token: '',
      userName: '',
      email: '',
      roles: [],
    };
    try {
      const { data } = await api.User.currentUser_GET();
      const { id, userName, email } = data!;
      const roles = data?.roles!.split(',');
      UserModule.GEN_ROUTE(roles!);
      return {
        userId: id,
        userName,
        email,
        roles,
        token,
      };
    } catch (error) {
      console.log('SET_USER:', error);
      return O;
    }
  }

  @Mutation
  public SET_TOKEN(res: api.LoginResponse) {
    if (res) {
      this.token = res.token!;
      this.userId = res.user?.id!;
      this.userName = res.user?.userName!;
      localStorage.setItem('TOKEN', res.token!);
    }
  }

  @Mutation
  public GEN_ROUTE(roles: string[]) {
    const userDynamicRoutes = updateRolesRoute(roles);
    userDynamicRoutes.forEach((route: any) => {
      router.addRoute(route);
    });
  }

  /** 初始化会话，从sessionStorage加载 */
  @Mutation
  public InitToken() {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      this.token = token;
    } else {
      console.log('vuex Session INIT  done activeSession isnull ');
    }
  }

  @Action({})
  public async FedLogOut() {
    return '';
  }

  @Action({})
  public async LogOut() {
    UserModule.CLEAR();
    sessionStorage.clear();
    localStorage.clear();
  }

  /** 清除所有会话 */
  @Mutation
  public CLEAR() {
    this.token = null;
    this.userId = -1;
    this.userName = '';
    this.email = '';
    this.roles = [];
  }
  get getToken() {
    return this.token;
  }
  get getUserName() {
    return this.userName;
  }
}
const UserModule = getModule(User);
export default UserModule;
