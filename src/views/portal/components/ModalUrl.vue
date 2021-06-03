<template>
  <a-modal
    :visible="visible"
    width="90%"
    :bodyStyle="{ maxHeight: '400px', overflow: 'auto', padding: '10px' }"
    :maskClosable="false"
    title="编辑Url"
    @cancel="closeModal"
    @ok="onSaveAsync"
  >
    <a-form :model="formState" layout="vertical">
      <a-form-item>
        <a-input v-model:value="formState.title" placeholder="title" allowClear> </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.url" placeholder="公网地址" allowClear> </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.homeUrl" placeholder="内网地址" allowClear> </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.desc" placeholder="desc" allowClear> </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.avatar" placeholder="avatar" allowClear> </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext, UnwrapRef, reactive, toRaw, PropType, watch } from 'vue';
import * as api from '@/api';
import { Modal, message } from 'ant-design-vue';
import { useLoading } from '@/hooks/web/useLoading';
import { cloneDeep } from 'lodash';

interface IUrls {
  title: string;
  /** 公网地址 */
  url: string;
  /** 内外地址 */
  homeUrl: string;
  desc: string;
  avatar: string;
}

export default defineComponent({
  name: 'ModalCategory',
  components: {},
  emits: ['update:visible', 'success'],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object as any,
      required: true,
    },
    urlIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit, attrs, slots }: SetupContext) {
    onMounted(() => {});

    watch(
      () => props.visible,
      v => {
        if (v) {
          console.log('indewx:', props.urlIndex);
          console.log('rr:', props.row);
          initForm();
          if (props.urlIndex > -1) {
            Object.assign(formState, props.row.urls[props.urlIndex]);
          }
        }
      }
    );

    const [openLoading, closeLoading] = useLoading();
    const formState: UnwrapRef<IUrls> = reactive({
      title: '',
      url: '',
      homeUrl: '',
      desc: '',
      avatar: '',
    });
    const initForm = () => {
      Object.assign(formState, { title: '', url: '', homeUrl: '', desc: '', avatar: '' });
    };
    const onSaveAsync = async () => {
      try {
        openLoading();
        const Param = cloneDeep(props.row);
        if (props.urlIndex > -1) {
          Param.urls[props.urlIndex] = toRaw(formState);
        } else {
          Param.urls.push(toRaw(formState));
        }
        Param.urlJson = JSON.stringify(Param.urls);
        emit('success', Param);
        closeModal();
      } catch (error) {
        Modal.error({
          title: '失败：',
          content: error.toString(),
        });
      } finally {
        closeLoading();
      }
    };
    // 关闭弹窗
    const closeModal = () => {
      emit('update:visible', false);
    };
    return {
      closeModal,
      formState,
      onSaveAsync,
    };
  },
});
</script>

<style scoped></style>
