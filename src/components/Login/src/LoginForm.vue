<template>
  <a-form :model="formState" @finish="onLoginAsync" layout="vertical">
    <a-form-item>
      <a-input v-model:value="formState.userName" placeholder="userName">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)"/></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="Password">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)"/></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :disabled="formState.userName === '' || formState.password === ''">
        确定
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted, UnwrapRef, reactive, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useLoading } from '@/hooks/web/useLoading';
import * as api from '@/api';
import UserModule from '@/store/modules/user';

export default defineComponent({
  name: 'LoginForm',
  components: { UserOutlined, LockOutlined },
  setup(props, { emit, attrs, slots }: SetupContext) {
    onMounted(() => {});
    const currentRoute = useRoute();
    const router: any = useRouter();

    const [openLoading, closeLoading] = useLoading();
    const formState: UnwrapRef<api.LoginStruct> = reactive({
      userName: '',
      password: '',
    });
    const onLoginAsync = async () => {
      try {
        openLoading();
        const res = await UserModule.Login(toRaw(formState));
        if (res) {
          message.success('登录成功');
          location.href = '/';
          // emit('success', res);
          // const to = currentRoute.query.redirect && currentRoute.query.redirect !== '/404' ? currentRoute.query.redirect : '/manage';
        }
      } catch (error) {
        Modal.error({
          title: '失败：',
          content: error.toString(),
        });
      } finally {
        closeLoading();
      }
    };
    return {
      formState,
      onLoginAsync,
    };
  },
});
</script>

<style scoped></style>
