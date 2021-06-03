<template>
  <a-modal
    :visible="visible"
    width="600px"
    :bodyStyle="{ maxHeight: '800px', overflow: 'auto', padding: '24px 120px' }"
    :maskClosable="false"
    title="modal"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from 'vue';

export default defineComponent({
  name: '',
  components: {},
  emits: ['update:visible', 'success'],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, attrs, slots }: SetupContext) {
    onMounted(() => {});
    // 关闭弹窗
    const closeModal = () => {
      emit('update:visible', false);
    };
    function handleOk() {
      emit('success', 'ok');
      closeModal();
    }
    return {
      closeModal,
      handleOk,
    };
  },
});
</script>

<style scoped></style>
