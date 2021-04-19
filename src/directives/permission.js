/**
 *
 * author: jiabinbin
 * Email: 425605679@qq.com
 * Desc:
 * version: 1.0.0
 */
import store from "@/store/store";
import router from '@/router'
export default function permission(el, binding, VNode, prevNode) {
  // 获取当前用户当前页面的按钮权限数组
  const { currentRoute } = router
  const userInfo = store.user.state.userInfo
  const { permissions = [] } = userInfo
  let currentPageId = ''
  let currentPageActions = []
  for (let i = 0; i < permissions.length; i++) {
    const { pageId, actions } = permissions[i]
    if (currentRoute.value.name === pageId) {
      currentPageId = pageId
      currentPageActions = actions
      break
    }
  }

  // 指令参数
  const {arg} = binding
  // 逻辑处理
  if (currentPageId) { // 如果当前页面有配置权限
    if (!currentPageActions.includes(arg)) { // 如果当前用户在这个菜单下没有该按钮权限
      el.style.display = 'none'
    }
  }
}
