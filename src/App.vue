<template>
  <a-config-provider :locale="zh_CN">
    <a-spin :tip="tip" :spinning="loading" :delay="delay" :size="size">
      <router-view />
    </a-spin>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import { useRoute, RouteMeta } from 'vue-router';
import { message } from 'ant-design-vue';
import appModule from '@/store/modules/app';

/**
 * @description: 检测浏览器
 * @return {void}
 */
function detectionBrowser() {
  const browserName = navigator.userAgent.toLowerCase();
  if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
    message.warning({
      content: `您使用的浏览器版本太低，可能无法正常使用本系统。 建议使用谷歌、火狐或360浏览器极速模式进行访问。`,
      title: '提示',
    });
    return;
  } else if (/firefox/i.test(browserName)) {
    return;
  } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
    return;
  } else {
    message.warning({
      content: `您使用的浏览器版本太低，可能无法正常使用本系统。 建议使用谷歌、火狐或360浏览器极速模式进行访问。`,
      title: '提示',
    });
  }
}

export default defineComponent({
  setup() {
    onMounted(() => {
      detectionBrowser();
    });

    const { tip, delay, loading, size } = appModule.fullLoadingOpt;
    const state = reactive({
      tip,
      delay,
      loading,
      size,
    });

    watch(
      () => appModule.fullLoadingOpt,
      (v: any) => {
        Object.assign(state, v);
      },
      { deep: true, immediate: true }
    );

    const APP_TITLE = process.env.VUE_APP_TITLE;
    const route = useRoute();
    watch(
      () => route.meta,
      (value: RouteMeta) => {
        if (value && value.title) {
          document.title = value.title + ' - ' + APP_TITLE;
        } else {
          document.title = APP_TITLE!;
        }
      }
    );

    return {
      zh_CN,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less">
@import url('./app.less');
</style>
