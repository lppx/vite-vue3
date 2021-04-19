import { getModules } from '@/locales/_utils'
import antLocal from 'ant-design-vue/es/locale/en_US'
const requireENContext = require.context('./en-US/', false, /[\w+].(js)$/)

const enUS = getModules(requireENContext)

export default {
  ...enUS,
  antLocal
}
