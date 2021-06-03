<template>
  <a-card>
    <h1 v-if="hasPermission([RoleEnum.系统管理员])">欢迎访问, 系统管理员</h1>
    <h1 v-if="hasPermission([RoleEnum.科研人员])">欢迎访问, 科研人员</h1>
    <a-divider>指令方式 使用权限控制</a-divider>
    <h1 v-auth="[RoleEnum.系统管理员]">欢迎访问, 系统管理员</h1>
    <h1 v-auth="RoleEnum.科研人员">欢迎访问, 科研人员</h1>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { usePermission } from '@/hooks/web/usePermission';
import { RoleEnum } from '@/enums/roleEnum';
export default defineComponent({
  name: 'Home',
  setup() {
    const { hasPermission } = usePermission();
    onMounted(() => {});
    return {
      hasPermission,
      RoleEnum,
    };
  },
});
</script>
