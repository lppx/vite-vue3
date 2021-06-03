<template>
  <a-layout style="flex-direction: column;">
    <AdminHeader />
    <a-layout :style="{ minHeight: 'calc(100vh - 120px)' }">
      <a-layout-sider
        theme="light"
        v-model:collapsed="collapsed"
        width="230px"
        class="mc-left-sider"
        collapsible
        breakpoint="xl"
        :trigger="null"
        :style="isScrollTop ? { position: 'fixed', top: '0', height: '100vh' } : {}"
      >
        <a-button type="primary" @click="switchCollapsed" style="border-radius: 0;width:100%;">
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
          {{ collapsed ? '菜单' : '功能菜单' }}
        </a-button>
        <AdminSidebarMenu :collapsed="collapsed"></AdminSidebarMenu>
      </a-layout-sider>
      <a-layout-content class="mc-content-box" :style="{ paddingLeft: isScrollTop ? (collapsed ? '80px' : '230px') : '0' }">
        <!-- <a-affix :offsetTop="0">
          <MutiTab v-if="multiTab"></MutiTab>
        </a-affix> -->
        <AdminPage></AdminPage>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import AdminHeader from './components/AdminHeader.vue';
import AdminSidebarMenu from './components/AdminSiderMenu.vue';
import AdminPage from './components/AdminPage.vue';
import { throttle } from 'lodash';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'MainLayout',
  components: { AdminHeader, AdminPage, AdminSidebarMenu, MenuUnfoldOutlined, MenuFoldOutlined },
  setup() {
    let collapsed = ref<boolean>(false);
    let isScrollTop = ref<boolean>(false);
    function switchCollapsed() {
      collapsed.value = !collapsed.value;
    }
    function handleFixSider() {
      const top = document.documentElement.scrollTop;
      if (top >= 120) {
        isScrollTop.value = true;
      } else {
        isScrollTop.value = false;
      }
    }
    onMounted(() => {
      window.addEventListener('scroll', throttle(handleFixSider, 50));
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleFixSider);
    });

    return {
      collapsed,
      isScrollTop,
      switchCollapsed,
    };
  },
});
</script>
