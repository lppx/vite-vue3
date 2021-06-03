<template>
  <div class="header">
    <a-row>
      <a-col :span="22" style="text-align: right;">
        <LoginCom />
      </a-col>
    </a-row>
  </div>
  <div class="container">
    <Nav />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';
import { LoginCom } from '@/components/Login';
import Nav from './components/Nav.vue';
import UserModule from '@/store/modules/user';
/** 首页 */
export default defineComponent({
  components: { LoginCom, Nav },
  setup(props, { emit, attrs, slots }: SetupContext) {
    const get = () => {};
    return {
      get,
    };
  },
});
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  padding: 10px;
  z-index: 10;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  width: 100%;
}
.container {
  padding: 10px;
  padding-top: 50px;
}
</style>
