import { App } from 'vue';
import {
  Button,
  Row,
  Col,
  Breadcrumb,
  Dropdown,
  Menu,
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Card,
  Empty,
  Popover,
  Table,
  Tabs,
  Tooltip,
  Alert,
  Drawer,
  Modal,
  Popconfirm,
  Progress,
  Spin,
  BackTop,
  ConfigProvider,
  Divider,
  Layout,
  Pagination,
  TreeSelect,
  Badge,
  Tag,
  Switch,
  Space,
  List,
  Collapse,
  Avatar,
} from 'ant-design-vue';

export function setupAntd(app: App<Element>) {
  app
    .use(Button)
    .use(Avatar)
    .use(Row)
    .use(Col)
    // .use(Affix)
    .use(Breadcrumb)
    .use(Dropdown)
    .use(Menu)
    .use(AutoComplete)
    // .use(Cascader)
    .use(Checkbox)
    .use(DatePicker)
    .use(TimePicker)
    .use(Form)
    .use(Input)
    .use(InputNumber)
    .use(Radio)
    .use(Select)
    // .use(Upload)
    .use(Card)
    .use(Empty)
    // .use(Image)
    .use(Popover)
    .use(Table)
    .use(Tabs)
    .use(Tooltip)
    // .use(Tree)
    .use(Alert)
    .use(Drawer)
    .use(Modal)
    .use(Popconfirm)
    .use(Progress)
    .use(Spin)
    .use(BackTop)
    .use(ConfigProvider)
    .use(Layout)
    .use(Pagination)
    .use(TreeSelect)
    .use(Badge)
    .use(Tag)
    .use(Switch)
    .use(Space)
    .use(List)
    .use(Collapse)
    .use(Divider);
}
