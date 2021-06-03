import { RouteRecordRaw } from 'vue-router';

type CallbackFunction = () => boolean;

declare module 'vue-router' {
  interface RouteMeta {
    authorize?: string | string[] | CallbackFunction;

    hidden?: boolean;

    /** 页面标题 */
    title: string;

    /** 备注（开发使用） */
    remark?: string;

    /** 图标，显示在导航菜单及标签页 */
    icon?: string;

    hiddenPageHeader?: boolean;

    /** 不显示页面标题 */
    hiddenPageHeaderContent?: boolean;

    /** 页面头部是否隐藏页面路径 */
    hiddenBreadcrumb?: boolean;

    /** 导航中提升子菜单到本级，自身不显示在导航 */
    concede?: boolean;

    alwaysShow?: boolean;

    noCache?: boolean;
  }

  interface RouteRecordRaw {}
}
