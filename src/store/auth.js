import { observable, flow, action } from 'mobx'
import { login as signIn } from '../api'
import { setToken } from '../util'

class AuthStore {
  @observable
  currentUser = {}

  @observable
  status = false

  @action
  setStatus = () => {
    this.status = true
  }

  login = flow(function* log(payload) {
    this.status = true
    const response = yield signIn(payload)
    const { token } = response
    setToken(token)
    this.currentUser = response
  })
}

const authStore = new AuthStore()

export default authStore
