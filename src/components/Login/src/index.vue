<template>
  <a-space>
    <span>{{ getUserName }}</span>
    <a v-if="getUserName" @click="logout">注销登录</a>
    <a v-else @click="visible = true">log in</a>
  </a-space>
  <ModalForm v-model:visible="visible" />
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted, reactive, toRefs, computed } from 'vue';
import * as api from '@/api';
import UserModule from '@/store/modules/user';
import ModalForm from './ModalForm.vue';
import { Modal, message } from 'ant-design-vue';

export default defineComponent({
  name: 'LoginCom',
  components: { ModalForm },
  setup(props, { emit, attrs, slots }: SetupContext) {
    onMounted(() => {});
    const state = reactive({
      visible: false,
    });

    const getUserName = computed(() => {
      return UserModule.getUserName;
    });

    const logout = () => {
      Modal.confirm({
        title: '您确定要退出登录吗？',
        onOk: () => {
          UserModule.LogOut().then(() => {
            message.success('成功退出登录');
            location.href = '/';
          });
        },
      });
    };

    return {
      ...toRefs(state),
      logout,
      getUserName,
    };
  },
});
</script>

<style scoped></style>
