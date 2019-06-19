import React, { Component } from 'react'
import { get } from 'lodash'
import { withRouter } from 'react-router-dom'
import {
  Form,
  Button,
  Input,
  Icon,
  Card,
} from 'antd'

import appConf from '../../config/app'
import { login } from '../../api'
import { setToken, setLoginUser } from '../../util'
import validateLogin from '../../validation/login'

const { Item } = Form

@withRouter
class Login extends Component {
  state = {
    user: '',
    password: '',
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }

  login = async () => {
    const { user, password } = this.state
    const data = {
      user,
      password,
    }
    const { error } = validateLogin(data)
    if (error) return
    const params = {
      data,
    }
    const res = await login(params)
    if (!res) return

    const defaultUser = {
      name: 'admin',
    }
    const { token } = res
    setLoginUser(defaultUser)

    if (token) {
      setToken(token)
      const { history } = this.props
      history.push('/home')
    }
  }

  render() {
    const { user, password } = this.state
    return (
      <Card
        style={{ width: 350, margin: '100px auto', textAlign: 'center' }}
      >
        <h1>{get(appConf, 'name', 'admin')}</h1>
        <Form style={{ maxWidth: 300 }}>
          <Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={user}
              onChange={e => this.handleChange('user', e.target.value)}
            />
          </Item>
          <Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => this.handleChange('password', e.target.value)}
            />
          </Item>
          <Item>
            <Button type="primary" onClick={this.login} block>
              登陆
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Login
