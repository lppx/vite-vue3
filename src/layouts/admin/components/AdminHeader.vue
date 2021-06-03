<template>
  <a-layout-header class="mc-header">
    <a-row style="width:100%;">
      <a-col :span="12"></a-col>
      <a-col :span="12" style="text-align: right;padding-right: 20px;">
        <router-link to="/manage"> <HomeOutlined /> 首页</router-link>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link" style="color:white;" href="#">
            您好,lppx
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link v-bind:to="'/manage'"> <UserOutlined />个人信息 </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link v-bind:to="'/manage'"> <KeyOutlined />修改密码 </router-link>
              </a-menu-item>
              <a-menu-item>
                <a @click.prevent="logout"><LogoutOutlined />退出登录 </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { DownOutlined, UserOutlined, LogoutOutlined, KeyOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import UserModule from '@/store/modules/user';

/** admin banner header */
export default defineComponent({
  name: 'AdminHeaderComponent',

  components: {
    DownOutlined,
    UserOutlined,
    LogoutOutlined,
    KeyOutlined,
    HomeOutlined,
  },
  setup() {
    const router = useRouter();

    // 退出登录
    const logout = () => {
      Modal.confirm({
        title: '您确定要退出登录吗？',
        onOk: () => {
          UserModule.LogOut().then(() => {
            message.success('成功退出登录');
            router.replace({ path: '/' }).finally(() => location.reload());
          });
        },
      });
    };
    return {
      logout,
    };
  },
});
</script>

<style scoped lang="less">
.mc-header {
  height: 120px;
  padding: 0;
  background: #fff;
  // box-shadow: 0 1px 0px #f0f1f2;
  position: relative;
  z-index: 10;
  // background: url('/images/head_title.jpg') no-repeat;
  background-color: #1c3177;
  /* width: calc(100% - 200px); */
  a {
    color: white;
  }
}
</style>
