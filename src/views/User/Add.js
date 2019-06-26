import React, { Component } from 'react'
import { Form } from 'antd'

import BaseLayout from '../../layout/BaseLayout'

const { Item } = Form

export default class UserAdd extends Component {
  state = {
    name: '',
    sex: 0,
  }

  render() {
    return (
      <BaseLayout
        title="新增用户"
      >
        <h1>hello</h1>
      </BaseLayout>
    )
  }
}
