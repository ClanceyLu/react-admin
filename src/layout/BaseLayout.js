import React, { useState } from 'react'
import { get } from 'lodash'
import {
  Layout,
  Icon,
  PageHeader,
  Menu,
  Dropdown,
} from 'antd'
import PropTypes from 'prop-types'

import appConf from '../config/app'
import { getLoginUser, removeLoginUser, removeToken } from '../util'
import './BaseLayout.css'
import SiderMenu from '../component/SiderMenu'

const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout

function logout() {
  removeToken()
  removeLoginUser()
}

// 用户下拉菜单
const menu = (
  <Menu>
    <Menu.Item key={1} onClick={logout}>登出</Menu.Item>
  </Menu>
)


function BaseLayout(props) {
  const [collapsed, setCollapsed] = useState(false)
  const {
    children = null,
    title = '',
    subTitle = '',
  } = props
  const loginUser = getLoginUser()
  return (
    <Layout
      style={{ height: '100vh' }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: '#fff' }}
        width={256}
      >
        <SiderMenu />
      </Sider>
      <Layout>
        <Header className="header">
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Dropdown overlay={menu}>
            <span className="login-user">{get(loginUser, 'name', 'admin')}</span>
          </Dropdown>
        </Header>
        <Content className="content">
          {
            title !== '' && (
            <PageHeader
              title={title}
              onBack={() => window.history.back()}
              subTitle={subTitle}
              style={{ marginBottom: 10 }}
            />
            )
          }
          {children}
        </Content>
        <Footer>{get(appConf, 'appConf.footer.ICP', 'admin')}</Footer>
      </Layout>
    </Layout>
  )
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BaseLayout
