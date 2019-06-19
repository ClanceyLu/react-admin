import React, { Component } from 'react'
import { getToken } from '../../util'

export default function WithAuth(Comp) {
  return class RequireAuth extends Component {
    componentWillMount() {
      const { history } = this.props
      if (!getToken()) {
        history.push('/login')
      }
    }

    render() {
      return <Comp {...this.props} />
    }
  }
}
