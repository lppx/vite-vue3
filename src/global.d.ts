import Vue from 'vue';
import { ModalOptions } from '@/utils/PromiseDialog';

declare module 'vue/types/vue' {
  type OpenDialog = (modalComponent: any, props: any, modalOptions?: ModalOptions) => Promise<any>;

  interface Vue {
    $openDialog: OpenDialog;
  }

  interface VueConstructor {
    $openDialog: OpenDialog;
  }
}
