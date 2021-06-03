<template>
  <a-card>
    <h1 v-if="hasPermission([RoleEnum.系统管理员])">欢迎访问, 系统管理员</h1>
    <a-divider>指令方式 使用权限控制</a-divider>
    <h1 v-auth="[RoleEnum.系统管理员]">欢迎访问, 系统管理员</h1>
    <a-divider>Modal</a-divider>
    <a-button type="primary" @click="visible = true">open modal</a-button>
  </a-card>
  <ModalEdit v-model:visible="visible" @success="onSuccess" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { usePermission } from '@/hooks/web/usePermission';
import { RoleEnum } from '@/enums/roleEnum';
import ModalEdit from './components/ModalEdit.vue';

export default defineComponent({
  name: 'Home',
  components: { ModalEdit },
  setup() {
    const { hasPermission } = usePermission();
    onMounted(() => {});
    const state = reactive({
      visible: false,
    });

    const onSuccess = (value: string) => {
      console.log('on success:', value);
    };

    return {
      hasPermission,
      RoleEnum,
      ...toRefs(state),
      onSuccess,
    };
  },
});
</script>
