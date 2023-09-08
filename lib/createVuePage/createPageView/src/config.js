
// 需要绑定到vuex中的组件对象的props
export const genComponentPropsConfig = ["_componentId", "_componentType", "_componentTag", "_componentNote", "_componentProps"];

// 组件类型映射和说明
export const componentTypeConfig = [
  {
    label: 'private',
    componentType: 0,
    note: '业务组件',
  },
  {
    label: 'page',
    componentType: 1,
    note: '页面/布局',
  },
  {
    label: 'base',
    componentType: 2,
    note: '基础组件',
  }
]
