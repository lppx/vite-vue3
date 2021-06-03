<template>
  <div style="display:inline-block;">
    <input ref="inputRef" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick" />
    <a-button type="primary" @click="handleUpload" style="margin-left: 8px;">{{ btnTitle }}</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import XLSX from 'xlsx';
import { message } from 'ant-design-vue';

export default {
  props: {
    btnTitle: {
      default: '导入表格',
    },
    isStandard: {
      // 是否标准表格
      default: true,
    },
    beforeUpload: Function,
    onSuccess: Function,
  },

  emits: ['start', 'end'],

  setup(props, context) {
    let loading = ref(false);
    let inputRef = ref();

    let excelData = reactive({
      header: null,
      results: null,
    });

    const generateData = (data: any) => {
      excelData.header = data.header;
      excelData.results = data.results;
      props.onSuccess && props.onSuccess(excelData);
    };

    const isExcel = (file: any) => {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    };

    const getHeaderRow = (sheet: any) => {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      let C;
      const R = range.s.r;
      for (C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        let hdr = 'UNKNOWN ' + C;
        if (cell && cell.t) {
          hdr = XLSX.utils.format_cell(cell);
        }
        headers.push(hdr);
      }
      return headers;
    };

    const readerData = (rawFile: any) => {
      context.emit('start');
      loading.value = true;
      return new Promise<void>(resolve => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          let header = [];
          let results = [];
          if (props.isStandard) {
            // 标准表格
            header = getHeaderRow(worksheet);
            results = XLSX.utils.sheet_to_json(worksheet);
          } else {
            // 去除首尾
            const orgResults: any = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
            if (orgResults[0].length !== orgResults[1].length) {
              // orgResults.pop() // 去除尾行
              orgResults.shift(); // 去除首行
            }
            header = orgResults[0];
            const ws = XLSX.utils.aoa_to_sheet(orgResults);
            results = XLSX.utils.sheet_to_json(ws);
          }

          generateData({ header, results });
          loading.value = false;
          context.emit('end');
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    };

    const upload = (rawFile: any) => {
      inputRef.value = null;
      if (!props.beforeUpload) {
        readerData(rawFile);
        return;
      }
      const before = props.beforeUpload(rawFile);
      if (before) {
        readerData(rawFile);
      }
    };

    const handleDrop = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      if (loading.value) {
        return;
      }
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        message.error('一次只能上传一个文件!');
        return;
      }
      const rawFile = files[0];

      if (!isExcel(rawFile)) {
        message.error('只支持 .xlsx, .xls, .csv 格式的文件!');
        return false;
      }
      upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    };

    const handleDragover = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    };

    const handleUpload = () => {
      inputRef.value.click();
    };

    const handleClick = (e: any) => {
      const files = e.target.files;
      const rawFile = files[0];
      if (!rawFile) {
        return;
      }
      upload(rawFile);
    };

    return {
      handleUpload,
      handleClick,
    };
  },
};
</script>

<style scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}
</style>
