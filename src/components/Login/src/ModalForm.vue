<template>
  <a-modal :visible="visible" :bodyStyle="{ maxHeight: '800px', overflow: 'auto', padding: '10px' }" :footer="null" :maskClosable="false" title="" @cancel="closeModal">
    <a-tabs default-active-key="1" style="text-align: center;margin:0 auto;width:50%;">
      <a-tab-pane key="1" tab="登录">
        <LoginForm @success="closeModal" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="注册">
        <RegisterForm />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from 'vue';
import LoginForm from '@/components/Login/src/LoginForm.vue';
import RegisterForm from '@/components/Login/src/RegisterForm.vue';

/** 登录 注册 */
export default defineComponent({
  name: 'ModalForm',
  components: { LoginForm, RegisterForm },
  emits: ['update:visible', 'success'],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, attrs, slots }: SetupContext) {
    onMounted(() => {});
    // 关闭弹窗
    const closeModal = () => {
      emit('update:visible', false);
    };
    return {
      closeModal,
    };
  },
});
</script>

<style scoped></style>
