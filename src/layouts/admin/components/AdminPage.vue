<template>
  <div>
    <slot name="pageHeader">
      <PageHeader></PageHeader>
    </slot>
    <div :style="contentCss" class="content">
      <slot>
        <RouteView></RouteView>
      </slot>
    </div>
    <BackTop />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageHeader from './PageHeader.vue';
import RouteView from '@/layouts/RouteView.vue';
import { BackTop } from 'ant-design-vue';
/** admin banner header */
export default defineComponent({
  name: 'AdminPage',

  components: { PageHeader, RouteView, BackTop },

  computed: {
    contentCss() {
      return {
        margin: this.$route.meta.hiddenPageHeader === true ? '0' : '10px',
        'margin-left': this.$route.meta.hiddenPageHeader === true ? '1px' : '10px',
      };
    },
  },
});
</script>
<style lang="less" scoped>
.content {
  background-color: white;
  border-radius: 3px;
  padding: 8px;
  min-height: calc(100vh - 175px);
}
</style>
