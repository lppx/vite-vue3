<template>
  <a-layout-content class="content">
    <!-- <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="12">
        <Search />
      </a-col>
    </a-row> -->
    <div v-if="isLogin" class="btn-box">
      <a-space>
        <a-switch checked-children="写" un-checked-children="读" v-model:checked="isEdit" />
        <a-switch checked-children="内网" un-checked-children="公网" v-model:checked="isHome" @change="onChangeIsHome" />
      </a-space>
    </div>
    <div>
      <div v-if="navData.length > 0" :key="domKey">
        <div style="margin-bottom: 24px;" v-for="(e, i) in navData" :key="i">
          <h3 class="flex">
            <!-- <Icon viewBox="0 0 1024 1024" theme="twoTone">
              <use :href="`#icon-${e.iconPath}`" />
            </Icon> -->
            <span style="margin: 0 8px;">{{ e.navName }}</span>
            <a v-if="isEdit">
              <EditOutlined @click="editCagetory(e)" />
              <a-popconfirm title="确定删除该分类吗?" @confirm="onDeleteCategory(e.id)">
                <DeleteOutlined style="color: red;margin-left: 8px;" />
              </a-popconfirm>
            </a>
            <a-button style="margin: 0 16px;" v-if="isEdit" size="small" type="dashed" @click="onEditUrls(e, -1)">添加链接</a-button>
          </h3>
          <div v-if="e.urls.length">
            <a-row :gutter="[24, 24]">
              <!-- <draggable :disabled="!isEdit" :list="e.urls" group="lppx"> -->
              <a-col v-for="(item, i) in e.urls" :key="i" :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6">
                <!-- pc -->
                <a-tooltip>
                  <template #title>
                    <span>{{ isHome && item.homeUrl ? item.homeUrl : item.url }}</span>
                  </template>
                  <div class="item" @click="toUrl(isHome && item.homeUrl ? item.homeUrl : item.url)">
                    <a-avatar v-if="item.avatar" :size="40" :src="item.avatar" />
                    <a-avatar v-else :size="40">
                      <template #icon>
                        <Icon viewBox="0 0 1024 1024">
                          <use href="#icon-rocket" />
                        </Icon>
                      </template>
                    </a-avatar>
                    <div style="padding-left: 15px;">
                      <p>
                        <strong>{{ item.title ? item.title : item.url }}</strong>
                      </p>
                      <p>{{ item.desc }}</p>
                    </div>
                    <div v-if="isEdit" class="edit-box">
                      <EditOutlined type="edit" @click.stop="onEditUrls(e, i)" />
                      <a-popconfirm title="确定删除该条目吗?" @confirm="onDeleteUrl(e, i)">
                        <DeleteOutlined style="margin-left: 8px;" type="delete" />
                      </a-popconfirm>
                    </div>
                  </div>
                </a-tooltip>
              </a-col>
              <!-- </draggable> -->
            </a-row>
          </div>
          <a-empty v-else />
        </div>
      </div>
      <a-empty v-else />
      <a-row :gutter="16" v-if="isEdit">
        <a-col :span="6">
          <a-space size="large">
            <a-button type="dashed" @click="editCagetory()">添加分类</a-button>
            <!-- <a-popconfirm title="确定清空所有数据吗?" ok-text="Yes" cancel-text="No" @confirm="onDeleteAll()">
              <a-button type="danger" icon="trash">清空所有数据</a-button>
            </a-popconfirm> -->
          </a-space>
        </a-col>
      </a-row>
    </div>
    <ModalCategory v-model:visible="showCategory" :row="row" @success="fetchAsync" />
    <ModalUrl v-model:visible="showUrl" :row="row" :urlIndex="urlIndex" @success="onSaveAsync" />
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted, reactive, toRefs, computed } from 'vue';
import Icon from '@ant-design/icons-vue';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons-vue';
import { useLoading } from '@/hooks/web/useLoading';
import * as api from '@/api';
import UserModule from '@/store/modules/user';
import { Modal, message } from 'ant-design-vue';
import { useRoute } from 'vue-router';

import ModalCategory from './ModalCategory.vue';
import ModalUrl from './ModalUrl.vue';

interface INav extends api.BizNav {
  urls: any;
}

interface IState {
  navData: INav[];
  showCategory: boolean;
  showUrl: boolean;
  isEdit: boolean;
  isHome: boolean;
  urlIndex: number;
  row: api.EditBizNav;
  domKey: number;
}

export default defineComponent({
  name: '',
  components: { Icon, EditOutlined, DeleteOutlined, UserOutlined, ModalCategory, ModalUrl },
  props: {},
  setup(props, { emit, attrs, slots }: SetupContext) {
    const route = useRoute();
    const [openLoading, closeLoading] = useLoading();
    const state: IState = reactive({
      navData: [],
      showCategory: false,
      showUrl: false,
      isEdit: false,
      isHome: false,
      urlIndex: -1,
      row: {} as any,
      domKey: 0,
    });
    onMounted(() => {
      fetchAsync();
    });

    /** 是否可编辑 登录才可编辑 */
    const isLogin = computed(() => {
      return UserModule.getUserName.length > 0;
    });

    const fetchAsync = async () => {
      try {
        openLoading();
        let username = '';
        if (route.params.username) {
          username = route.params.username as any;
        } else {
          if (UserModule.getUserName) {
            username = UserModule.getUserName;
          }
        }
        const { data } = await api.Base.getnav_GET({ username });
        for (const r of data! as any) {
          r.urls = JSON.parse(r.urlJson!);
        }
        state.navData = data! as any;
        console.log('datga:', data);
      } finally {
        closeLoading();
      }
    };

    /** 保存分类 */
    const onSaveAsync = async (e: api.EditBizNav) => {
      try {
        openLoading();
        await api.Nav.edit_POST(e);
        message.success('保存成功');
        fetchAsync();
      } finally {
        closeLoading();
      }
    };

    /** 跳转url */
    const toUrl = (url: string) => {
      if (state.isEdit) {
        return;
      }
      window.open(url, '_blank');
    };

    /** 切换公网内网 */
    const onChangeIsHome = (e: any) => {
      //  改变domkey 重新渲染dom 切换switch显示公网内网地址
      state.domKey++;
    };

    /** 编辑分类 */
    const editCagetory = (e?: any) => {
      if (e) {
        Object.assign(state.row, e);
      } else {
        state.row = {} as any;
      }
      state.showCategory = true;
    };
    /** 删除分类 */
    const onDeleteCategory = async (id: any) => {
      try {
        openLoading();
        await api.Nav.delete_DELETE({ id });
        fetchAsync();
      } finally {
        closeLoading();
      }
    };
    /** 编辑url */
    const onEditUrls = (e: any, index: number) => {
      Object.assign(state.row, e);
      state.urlIndex = index;
      state.showUrl = true;
    };
    /** 删除url */
    const onDeleteUrl = (e: any, index: number) => {
      e.urls.splice(index, 1);
      e.urlJson = JSON.stringify(e.urls);
      onSaveAsync(e);
    };

    return {
      ...toRefs(state),
      isLogin,
      toUrl,
      editCagetory,
      onDeleteCategory,
      onEditUrls,
      onDeleteUrl,
      fetchAsync,
      onSaveAsync,
      onChangeIsHome,
    };
  },
});
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.btn-box {
  position: fixed;
  top: 50px;
  right: 15px;
}
.flex {
  display: flex;
  align-items: center;
}
.icon {
  margin-right: 8px;
  font-size: 27px;
}
.content {
  // margin: 24px 16px;
  padding: 24px;
  // background: rgb(255, 255, 255);
  min-height: 280px;
}
.item {
  cursor: pointer;
  height: 86px;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  background-color: #fff;
  padding: 15px;
  display: flex;
  align-items: center;
}
.edit-box {
  position: absolute;
  top: 10px;
  right: 20px;
  background-color: antiquewhite;
  padding: 2px 6px;
  border-radius: 3px;
}
</style>
