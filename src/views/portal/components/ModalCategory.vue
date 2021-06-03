<template>
  <a-modal
    :visible="visible"
    width="90%"
    :bodyStyle="{ maxHeight: '400px', overflow: 'auto', padding: '10px' }"
    :maskClosable="false"
    title="编辑分类"
    @cancel="closeModal"
    @ok="onSaveAsync"
  >
    <a-form :model="formState" layout="vertical">
      <a-form-item>
        <a-input v-model:value="formState.navName" placeholder="navName"> </a-input>
      </a-form-item>
      <!-- <a-form-item>
        <a-input v-model:value="formState.iconPath" placeholder="iconPath"> </a-input>
      </a-form-item> -->
      <a-form-item>
        <a-space>
          <span>是否公开：</span>
          <a-switch v-model:checked="formState.isPublic" />
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext, UnwrapRef, reactive, toRaw, PropType, watch } from 'vue';
import * as api from '@/api';
import { Modal, message } from 'ant-design-vue';
import { useLoading } from '@/hooks/web/useLoading';

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
      type: Object as PropType<api.EditBizNav>,
      required: true,
    },
  },
  setup(props, { emit, attrs, slots }: SetupContext) {
    onMounted(() => {});

    watch(
      () => props.visible,
      v => {
        if (v) {
          if (Object.keys(props.row).length) {
            Object.assign(formState, props.row);
          } else {
            initForm();
          }
          console.log('form:', formState);
        }
      }
    );

    const [openLoading, closeLoading] = useLoading();
    const formState: UnwrapRef<api.EditBizNav> = reactive({
      id: 0,
      navName: '',
      isPublic: false,
      iconPath: '',
      urlJson: '',
      urls: [],
    });
    const initForm = () => {
      Object.assign(formState, {
        id: 0,
        navName: '',
        isPublic: false,
        iconPath: '',
        urlJson: '',
        urls: [],
      });
    };
    const onSaveAsync = async () => {
      try {
        openLoading();
        formState.urlJson = JSON.stringify((formState as any).urls);
        formState.id ? await api.Nav.edit_POST(toRaw(formState)) : await api.Nav.create_POST(toRaw(formState));
        message.success('保存成功');
        emit('success');
        closeModal();
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
