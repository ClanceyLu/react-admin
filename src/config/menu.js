const menus = [
  {
    name: '首页',
    icon: 'home',
    path: '/home',
  },
  {
    name: '用户',
    icon: 'user',
    path: '/user',
    permissions: [],
    children: [
      {
        name: '列表',
        path: '/user/list',
      },
      {
        name: '详情',
        path: '/user/:id/detail',
        hide: true,
      },
      {
        name: '新增',
        path: '/user/add',
        hide: true,
      },
    ],
  },
  {
    name: '机密',
    path: '/profile',
  },
]

export default menus
