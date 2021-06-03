<template>
  <div class="pageheader" v-if="!$route.meta.hiddenPageHeader">
    <Breadcrumb v-if="!$route.meta.hiddenBreadcrumb"></Breadcrumb>
    <div class="detail" v-if="!$route.meta.hiddenPageHeaderContent">
      <div class="row">
        <div class="action">
          <slot name="action"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Breadcrumb from './Breadcrumb.vue';
/** 页面内部标题 */
export default defineComponent({
  name: 'PageHeader',

  components: { Breadcrumb },

  data() {
    return {
      title: '',
    };
  },

  watch: {
    $route(val: any) {
      if (val.meta) {
        this.title = val.meta.title;
      }
    },
  },
});
</script>

<style scoped lang="less">
.pageheader {
  background: #fff;
  padding: 0 6px;
  border-bottom: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
  height: 33px;
  display: flex;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 16px;
    flex: auto;
  }
}
</style>
