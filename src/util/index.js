import qs from 'qs'
import { intersection } from 'ramda'
// 设置token
export function setToken(token) {
  localStorage.setItem('token', token)
}

// 获取token
export function getToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    return ''
  }
  return token
}

// 移除token
export function removeToken() {
  localStorage.removeItem('token')
}

// 获取当前页面路径
export function getUrlPath() {
  const path = window.location.pathname
  return path
}

// 获取权限
export function getPermissions() {
  const permissions = localStorage.getItem('permissions')
  return JSON.parse(permissions) || []
}

// 设置权限
export function setPermissions(permissions) {
  let p = ''
  if (typeof permissions === 'string') {
    p = permissions
  } else {
    p = JSON.stringify(permissions)
  }
  localStorage.setItem('permissions', p)
}

// 当前用户是否有权限，permissions 为目录权限
export function hasPermissions(permissions = []) {
  const userPermissions = getPermissions()
  return !!intersection(permissions, userPermissions).length
}

function getQueryString() {
  return window.location.search
}

// 获取url query 数据
export function getUrlQuery() {
  return qs.parse(getQueryString(), { ignoreQueryPrefix: true })
}

// 获取分页页数
export function getUrlPage() {
  const { page = 1 } = getUrlQuery()
  return Number.parseInt(page, 10)
}

// 设置url query
export function setUrlQuery(data, defaultData = {}) {
  const queryData = getUrlQuery()
  const query = qs.stringify({
    ...defaultData,
    ...queryData,
    ...data,
  })
  return query
}

// 设置登陆用户信息
export function setLoginUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

// 获取登陆用户信息
export function getLoginUser() {
  const user = localStorage.getItem('user')
  if (!user) {
    return {}
  }
  return JSON.parse(user)
}

// 移除登陆用户信息
export function removeLoginUser() {
  localStorage.removeItem('user')
}
