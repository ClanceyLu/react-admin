import request from '../util/request'

export function login(params) {
  const { data } = params
  return request('/login', 'post', data)
}

export function getUsers(params) {
  const { data } = params
  return request('/user', 'get', data)
}
