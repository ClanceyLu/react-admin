import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import menus from 'config/menu'

import { getUrlPath, hasPermissions } from '../../util'

const { Item, SubMenu } = Menu

function getMenu(menu) {
  const { children = [], hide = false, permissions = [] } = menu

  // 当前用户是否有权限看到该目录
  if (permissions.length > 0 && !hasPermissions(permissions)) {
    return null
  }
  if (hide) return null
  if (children.length) {
    return (
      <SubMenu
        key={menu.path}
        title={menu.name}
      >
        {
          children.map(child => (
            child.hide || (child.permissions && !hasPermissions(child.permissions)) ? null
              : (
                <Item
                  key={child.path}
                >
                  <Link to={child.path}>
                    {child.name}
                  </Link>
                </Item>
              )
          ))
        }
      </SubMenu>
    )
  }

  return (
    <Item key={menu.path}>
      <Link to={menu.path}>
        {menu.name}
      </Link>
    </Item>
  )
}

class SiderMenu extends Component {
  state = {
    openKeys: [],
  }

  componentDidMount() {
    const path = getUrlPath().split('?')[0]
    const paths = path.split('/').filter(i => i)
    this.setState({
      openKeys: paths.map((urlItem, index) => `/${paths.slice(0, index + 1).join('/')}`),
    })
  }

  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    })
  }

  render() {
    const { openKeys } = this.state
    return (
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={openKeys}
      >
        {
          menus.map(getMenu)
        }
      </Menu>
    )
  }
}

export default SiderMenu
