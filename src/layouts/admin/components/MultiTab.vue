<template>
  <div>
    <a-tabs
      type="editable-card"
      v-model:activeKey="activeKey"
      :hideAdd="true"
      :tabBarStyle="{ background: '#FFF', margin: 0, paddingLeft: '16px', paddingTop: '1px' }"
      @edit="onEdit"
    >
      <a-tab-pane v-for="page in pages" :key="page.fullPath" :closable="fullPathList.length > 1">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span style="{ userSelect: 'none' }">
              <Icon v-if="page.meta.icon" viewBox="0 0 1024 1024">
                <use :xlink:href="'#icon-' + page.meta.icon" />
              </Icon>
              {{ page.meta.title }}
            </span>
            <template #overlay>
              <a-menu @click="onMenuClose" v-if="fullPathList.length > 1">
                <a-menu-item key="close-that" :data-path="page.fullPath"> <CloseCircleOutlined />关闭当前标签 </a-menu-item>
                <a-menu-item key="close-right" :data-path="page.fullPath"> <VerticalLeftOutlined />关闭右侧 </a-menu-item>
                <a-menu-item key="close-left" :data-path="page.fullPath"> <VerticalRightOutlined />关闭左侧 </a-menu-item>
                <a-menu-item key="close-all" :data-path="page.fullPath"> <CloseOutlined />关闭其它 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { CloseCircleOutlined, VerticalLeftOutlined, VerticalRightOutlined, CloseOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'MultiTab',

  components: { CloseCircleOutlined, VerticalLeftOutlined, VerticalRightOutlined, CloseOutlined },

  data() {
    return {
      pages: [] as any[],
      fullPathList: [] as string[],
      activeKey: '',
      newTabIndex: 0,
    };
  },

  watch: {
    $route(newVal: any) {
      this.activeKey = newVal.fullPath;
      if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
        if (newVal.fullPath === '/') {
          this.fullPathList.unshift(newVal.fullPath);
          this.pages.unshift(newVal);
        } else {
          this.fullPathList.push(newVal.fullPath);
          this.pages.push(newVal);
        }
      }
    },

    activeKey(newPathKey: string) {
      this.$router.push({ path: newPathKey });
    },
  },

  created() {
    this.pages.push(this.$route);
    this.fullPathList.push(this.$route.fullPath);
    this.selectedLastPath();
  },

  methods: {
    selectedLastPath() {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1];
    },

    onEdit(targetKey: string, action: string) {
      if (action === 'remove') {
        this.remove(targetKey);
      } else {
        message.error({ content: `未知功能 ${action}` });
      }
    },

    remove(targetKey: string) {
      const arr = this.pages.filter(page => page.fullPath === targetKey);
      if (arr.length === 0) {
        return;
      }
      const pageRemoved = arr[0];
      this.pages = this.pages.filter(page => page.fullPath !== targetKey);
      this.fullPathList = this.fullPathList.filter(path => path !== targetKey);
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath();
      }
    },

    /** muti tab close menu click */
    onMenuClose({ key, item, domEvent }: { key: string; item: any; domEvent: any }) {
      const path = domEvent.target.getAttribute('data-path');
      switch (key) {
        case 'close-right':
          this.closeRight(path);
          break;
        case 'close-left':
          this.closeLeft(path);
          break;
        case 'close-all':
          this.closeAll(path);
          break;
        default:
        case 'close-that':
          this.closeThat(path);
          break;
      }
    },

    closeThat(e: string) {
      this.remove(e);
    },

    closeLeft(e: string) {
      const currentIndex = this.fullPathList.indexOf(e);
      if (currentIndex > 0) {
        this.fullPathList.forEach((item, index) => {
          if (index < currentIndex) {
            this.remove(item);
          }
        });
      }
    },

    closeRight(e: string) {
      const currentIndex = this.fullPathList.indexOf(e);
      if (currentIndex < this.fullPathList.length - 1) {
        this.fullPathList.forEach((item, index) => {
          if (index > currentIndex) {
            this.remove(item);
          }
        });
      }
    },

    closeAll(e: string) {
      const currentIndex = this.fullPathList.indexOf(e);
      this.fullPathList.forEach((item, index) => {
        if (index !== currentIndex) {
          this.remove(item);
        }
      });
    },
  },
});
</script>
