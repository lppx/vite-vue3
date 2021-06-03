<template>
  <a-form :model="formState" @finish="onLoginAsync" layout="vertical">
    <a-form-item>
      <a-input v-model:value="formState.email" placeholder="Email">
        <template #prefix><MailOutlined style="color: rgba(0, 0, 0, 0.25)"/></template>
      </a-input>
    </a-form-item>
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
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { useLoading } from '@/hooks/web/useLoading';
import * as api from '@/api';

export default defineComponent({
  name: 'LoginForm',
  components: { UserOutlined, LockOutlined, MailOutlined },
  setup(props, { emit, attrs, slots }: SetupContext) {
    onMounted(() => {});

    const [openLoading, closeLoading] = useLoading();
    const formState: UnwrapRef<api.RegisterUser> = reactive({
      userName: '',
      password: '',
      email: '',
    });
    const onLoginAsync = async () => {
      try {
        openLoading();
        await api.Base.register_POST(toRaw(formState));
        message.success('注册成功');
        emit('success');
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
