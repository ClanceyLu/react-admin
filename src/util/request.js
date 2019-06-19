import axios from 'axios'
import { message, notification } from 'antd'

import { getToken, removeToken } from './index'

function checkStatus(res) {
  const { status } = res
  if (status === 200) {
    return res.data
  } if (status === 401) {
    removeToken()
  } if (status === 500) {
    notification('error')({
      message: '服务器错误',
      description: '请联系开发人员',
    })
  }
  const err = new Error('请求错误')
  err.Code = status
  throw err
}

// 检查业务逻辑，status 0 为操作正确，其他为操作错误
function checkCode(data) {
  const { status } = data
  if (status !== 0) {
    const { msg = '' } = data
    message.error(msg)
    return null
  }
  return data.data
}

function request(path, method = 'GET', data = {}, headers = {}) {
  const requestConf = {
    method,
    url: path,
    headers: {
      'Content-Type': 'application/json',
      'X-TY-Admin-Token': getToken(),
      ...headers,
    },
  }
  if (method.toUpperCase() === 'GET') {
    requestConf.params = data
  } else {
    requestConf.data = data
  }
  return axios(requestConf)
    .then(checkStatus)
    .then(checkCode)
}

export default request
