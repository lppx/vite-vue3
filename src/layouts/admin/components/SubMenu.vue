<template>
  <template v-if="item.meta && !item.meta.hidden">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <a-menu-item :key="resolvePath(theOnlyOneChild.path)">
        <router-link :to="resolvePath(theOnlyOneChild.path)" :target="theOnlyOneChild.meta?.target">
          <Icon v-if="theOnlyOneChild.meta?.icon" viewBox="0 0 1024 1024">
            <use :href="'#icon-' + theOnlyOneChild.meta.icon" />
          </Icon>
          <span>{{ theOnlyOneChild.meta ? theOnlyOneChild.meta.title : theOnlyOneChild.name }}</span>
        </router-link>
      </a-menu-item>
    </template>

    <a-sub-menu v-else :key="resolvePath(item.path)">
      <template #title>
        <Icon v-if="item.meta?.icon" viewBox="0 0 1024 1024">
          <use :href="'#icon-' + item.meta.icon" />
        </Icon>
        <span>{{ item.meta ? item.meta.title : item.name }}</span>
      </template>
      <template v-if="item.children">
        <SubMenu v-for="child in item.children" :key="resolvePath(child.path)" :item="child" :base-path="resolvePath(child.path)"></SubMenu>
      </template>
    </a-sub-menu>
  </template>
</template>

<script lang="ts">
import path from 'path';
import { defineComponent, PropType } from 'vue';
import Icon from '@ant-design/icons-vue';
import { RouteRecordRaw } from 'vue-router';

const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

export default defineComponent({
  name: 'SubMenu',

  components: { Icon },

  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
  },

  computed: {
    alwaysShowRootMenu() {
      if (this.item.meta && this.item.meta.alwaysShow) {
        return true;
      }
      return false;
    },

    showingChildNumber(): number {
      if (this.item.children) {
        const showingChildren = this.item.children.filter(item => {
          if (item.meta && item.meta.hidden) {
            return false;
          } else {
            return true;
          }
        });
        return showingChildren.length;
      }
      return 0;
    },

    theOnlyOneChild(): null | RouteRecordRaw {
      if (this.showingChildNumber > 1) {
        return null;
      }
      if (this.item.children) {
        for (const child of this.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...this.item, path: '' };
    },
  },

  methods: {
    resolvePath(routePath: string) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
});
</script>
