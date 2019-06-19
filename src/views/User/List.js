import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  Card,
  Avatar,
  Divider,
  Button,
  Select,
  Row,
  Col,
  Input,
} from 'antd'

import { getUsers } from '../../api'
import BaseLayout from '../../layout/BaseLayout'
import {
  setUrlQuery,
  getUrlPage,
} from '../../util';

const { Search } = Input


class UserList extends Component {
  state = {
    list: [],
    total: 0,
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = async () => {
    const params = {
      data: {
        page: getUrlPage(),
        pageSize: 10,
      },
    }
    const res = await getUsers(params)
    const { list = [], total = 0 } = res
    this.setState({
      list,
      total,
    })
  }

  getData = () => {
    const { list } = this.state
    return list.map(i => ({
      name: i.nickname,
      avatar: i.avatar,
      phoneNo: i.phoneNo,
      sex: i.sex,
    }))
  }

  columns = () => [
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '头像',
      key: 'avatar',
      dataIndex: 'avatar',
      render: (avatar, record) => (
        <Avatar src={avatar}>{record.nickname}</Avatar>
      ),
    },
    {
      title: '手机号',
      key: 'phoneNo',
      dataIndex: 'phoneNo',
    },
    {
      title: '性别',
      key: 'sex',
      dataIndex: 'sex',
      render: (sex) => {
        if (sex) {
          return sex === 1 ? '男' : '女'
        }
        return '未知'
      },
    },
    {
      title: '操作',
      key: 'opt',
      render: (_, record) => (
        <div>
          <Link to={`/user/${record.id}/detail`}>详情</Link>
          <Divider type="vertical" />
          <Button type="link">禁言</Button>
        </div>
      ),
    },
  ]

fetchPage = (e) => {
  const { current } = e
  const query = setUrlQuery({ page: current })
  const { history } = this.props
  history.push(`/user/list?${query}`)
  this.fetchList()
}

filter = () => (
  <div style={{ paddingBottom: 20 }}>
    <Row gutter={16}>
      <Col span={6}>
        <Select
          style={{ width: '80%' }}
          placeholder="请选择条件"
        />
      </Col>
      <Col span={6}>
        <Select
          style={{ width: '80%' }}
          placeholder="请选择条件"
        />
      </Col>
      <Col span={6}>
        <Search style={{ width: '80%' }} />
      </Col>
      <Col span={6} />
    </Row>
    <Divider
      dashed
      style={{ margin: 10 }}
    />
    <Row gutter={16}>
      <Col span={6}>
        <Select
          style={{ width: '80%' }}
          placeholder="请选择条件"
        />
      </Col>
      <Col span={6}>
        <Select
          style={{ width: '80%' }}
          placeholder="请选择条件"
        />
      </Col>
      <Col span={6}>
        <Button type="primary" size="small">搜索</Button>
        <Divider type="vertical" />
        <Button size="small">清除条件</Button>
      </Col>
      <Col span={6} />
    </Row>
  </div>
)

render() {
  const { total } = this.state
  const data = this.getData()
  return (
    <BaseLayout
      title="用户列表"
      subTitle="小程序用户"
    >
      <Card>
        {this.filter()}
        <Table
          columns={this.columns()}
          dataSource={data}
          pagination={{
            current: getUrlPage(),
            pageSize: 10,
            size: 'small',
            showQuickJumper: true,
            total,
          }}
          size="middle"
          onChange={this.fetchPage}
        />
      </Card>
    </BaseLayout>
  )
}
}

export default UserList
