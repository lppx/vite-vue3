<template>
  <div>
    <a-layout-sider v-model:collapsed="collapsed" width="230px" class="mc-left-sider" breakpoint="lg" collapsible :trigger="null" :style="getScrollTop ? styleObj : {}">
      <AdminSidebarMenu></AdminSidebarMenu>
    </a-layout-sider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminSidebarMenu from './AdminSiderMenu.vue';

/** admin banner header */
export default defineComponent({
  name: 'AdminSiderComponent',

  components: { AdminSidebarMenu },

  data() {
    return {
      scrollTop: 0,
      element: null as any,
      styleObj: { position: 'fixed', top: '0' },
    };
  },

  computed: {
    collapsed() {
      return this.$store.state.app.collapsed;
    },
    // 距离顶部是否大于120px
    getScrollTop() {
      return this.$store.state.app.isScrollTop;
    },
  },

  mounted() {
    // 监听页面大小变化
    this.element = document.querySelector('.mc-left-sider');
  },

  methods: {
    /** 自适应内容布局 */
    handleFixSider() {
      let top = document.documentElement.scrollTop;
      if (top <= 120) {
        top = 120 - top;
        this.element.style.top = `${top}px`;
        this.element.style.height = (window.document.body.clientHeight - top).toString() + 'px';
      } else {
        this.element.style.top = `0px`;
        this.element.style.height = '100%';
      }
    },
  },
});
</script>

<style scoped>
.logo {
  height: 50px;
  background: #1890ff;
  margin: 16px;
  color: #fff;
  font-size: 16px;
  line-height: 50px;
}
.mc-left-sider {
  /* position: fixed; */
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
}
.mc-left-fix-top {
  top: 0;
}
.ant-menu-inline {
  border: none;
  text-align: left;
}
</style>
