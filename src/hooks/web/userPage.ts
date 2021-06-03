import { ref } from 'vue';
import { PaginationProps } from 'ant-design-vue/lib/pagination/Pagination';

export interface PageOption extends Partial<typeof PaginationProps> {
  current?: number;
  pageSize?: number;
  total?: number;
  pageSizeOptions?: string[]; // 指定每页可以显示多少条
  showSizeChanger?: boolean; // 显示可改变每页数量
  showQuickJumper?: boolean; // 是否显示跳转
  showTotal?: (total: number) => any; // 显示总数
  onChange?: (current: number, pageSize: number) => any; // 页码改变
  onShowSizeChange?: (current: number, pageSize: number) => any; // pageSize变化
  pageChange?: (current: number, pageSize: number) => any; // 页码或pageSize变化触发
  [key: string]: any;
}

export function usePages(pageOptions?: PageOption) {
  // 分页配置参数
  const pageOption = ref({
    current: 1,
    pageSize: 20,
    total: 0,
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showQuickJumper: true,
    showSizeChanger: true, // 显示可改变每页数量
    showTotal: (total: number) => `共 ${total} 条`, // 显示总数
    onChange: (current: number, pageSize: number) => pageOptions?.pageChange?.(current, pageSize),
    onShowSizeChange: (current: number, pageSize: number) => pageOptions?.pageChange?.(current, pageSize),
    ...pageOptions,
  });

  // 提供给ant-pagination组件的参数
  // const state = reactive({
  //     pageOption
  // })

  return {
    pageOption,
  };
}
