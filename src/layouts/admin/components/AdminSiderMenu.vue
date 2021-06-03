<template>
  <a-menu mode="inline" style="border:none;" :inline-collapsed="collapsed" v-model:openKeys="openKeys" v-model:selectedKeys="selectKeys" @openChange="openChange">
    <SubMenu v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
  </a-menu>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
import SubMenu from './SubMenu.vue';
import { getMenuRoutes } from '@/router';
import { useRoute } from 'vue-router';

function getParentPaths(path: string): string[] {
  const result: string[] = [];
  const arr = path.split('/');
  for (let i = arr.length - 1; i > 1; i--) {
    const xx = arr.slice(0, i);
    result.push(xx.join('/'));
  }
  return result;
}

export default defineComponent({
  name: 'MenuList',
  components: {
    SubMenu,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup(props) {
    const currentRoute = useRoute();
    const routes = getMenuRoutes();

    const getOpenKeys = () => getParentPaths(currentRoute.path);

    const state = reactive({
      openKeys: [] as string[],
      selectKeys: [] as string[],
    });
    onMounted(() => {
      state.openKeys = getOpenKeys();
      state.selectKeys = [currentRoute.path, ...state.openKeys];
    });

    watch(
      () => props.collapsed,
      newVal => {
        state.openKeys = newVal ? [] : getOpenKeys();
        state.selectKeys = [currentRoute.path, ...state.openKeys];
      }
    );

    watch(
      () => currentRoute.path,
      () => {
        if (props.collapsed) {
          return;
        }
        state.openKeys = getOpenKeys();
        state.selectKeys = [currentRoute.path, ...state.openKeys];
      }
    );
    function openChange(openKeys: string[]) {
      state.openKeys = openKeys;
    }
    return {
      ...toRefs(state),
      routes,
      openChange,
    };
  },
});
</script>
