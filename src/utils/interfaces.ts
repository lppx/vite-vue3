type CallbackFunction = () => boolean;
export interface RouterItemMeta {
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

  /** 不否显示主页面区域水平导航菜单，内容为 [route.name] */
  submenu?: string[];

  /** 左侧树型导航终结点，忽略 children  */
  treeNavEndNode?: boolean;

  /** 链接打开目标 null | _blank | abc...*/
  target?: string;

  /** 排除页面*/
  excludes?: string[];
}
export interface RouterItem extends Exclude<any, 'meta' | 'children'> {
  // name?: string;
  // component?: any;
  // path: string;
  // icon?: string;
  // hidden?: boolean;
  // permission?: string | string[] | boolean;
  // redirect?: string | object;
  children?: RouterItem[];
  meta?: RouterItemMeta;
}

export interface MetaPage {
  meta: RouterItemMeta;
}

export interface ITableColumn {
  title: string;
  dataIndex: string;
  ellipsis?: boolean;
}
