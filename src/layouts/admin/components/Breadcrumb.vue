<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="item in breadList" :key="item.name">
      <router-link :to="{ path: item.path === '' ? '/' : item.path }">
        <Icon v-if="item.meta.icon" viewBox="0 0 1024 1024">
          <use :xlink:href="'#icon-' + item.meta.icon" />
        </Icon>
        {{ item.meta.title }}
      </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Icon from '@ant-design/icons-vue';
import { RouteLocationMatched, useRoute } from 'vue-router';

export default defineComponent({
  name: 'Breadcrumb',

  components: { Icon },

  setup(props) {
    let breadList = ref<RouteLocationMatched[]>([]);
    let route = useRoute();

    const getBreadcrumb = () => {
      breadList.value = [];
      route.matched
        .filter(o => o.meta && o.meta.hiddenBreadcrumb !== true)
        .forEach(item => {
          breadList.value.push(item);
        });
    };

    getBreadcrumb();

    watch(
      () => route.path,
      () => {
        getBreadcrumb();
      }
    );

    return {
      breadList,
    };
  },
});
</script>
