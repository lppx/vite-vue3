export interface ApiResponseData<T> {
  /**
   * 操作是否成功
   */
  success: boolean;

  /**
   * 状态码
   */
  statusCode: number;

  /**
   * 提示信息
   */
  message: string;

  /**
   * 操作结果数据
   */
  data?: T;
}

/**
 * Non-enumerable version of the PagedList class.
 */
export interface PagedList<T> {
  /**
   * 总页数
   */
  pageCount: number;
  /**
   * 元素总个数
   */
  totalItemCount: number;
  /**
   * 元素总个数
   */
  pageNumber: number;
  /**
   * 每页大小
   */
  pageSize: number;
  /**
   * 是否有上页
   */
  hasPreviousPage: boolean;
  /**
   * 是否有下页
   */
  hasNextPage: boolean;
  /**
   * 是否首页
   */
  isFirstPage: boolean;
  /**
   * 是否末页
   */
  isLastPage: boolean;
  /**
   * 当前页第一个元素在总列表中的序号，从0开始
   */
  firstItemOnPage: number;
  /**
   * 当前页最后一个元素在总列表中的序号，从0开始
   */
  lastItemOnPage: number;

  /**
   * 元素列表
   */
  items?: T[];
}

/** 树节点 */
export interface TreeNode<T> {
  /** id or code */
  id: string;

  /** 父节点ID or code */
  parentId: string;

  /** display name */
  name: string;

  /** 子节点 */
  children: TreeNode<T> | undefined | any;

  /** 数据项 */
  data: T | undefined | any;
}
