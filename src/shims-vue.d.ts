declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'tinymce/tinymce' {
  const tinymce: any;
  export default tinymce;
}

declare module 'ant-design-vue/lib/locale-provider/zh_CN';
