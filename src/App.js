import React, { Suspense } from 'react'
import 'antd/dist/antd.less'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { getToken, hasPermissions } from './util'
import routes from './config/route'

import './App.css'

const token = getToken()

// 判断用户是否拥有访问权限
function PrivateRoute({ permissions = [], component: Component, ...rest }) {
  const allowed = hasPermissions(permissions)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!permissions.length || allowed) {
          return <Component {...props} />
        }
        return <Redirect to="/401" />
      }}
    />
  )
}

function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Router className="App">
        <Route
          exact
          path="/"
          render={() => (
            !token ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/home" />
            )
          )}
        />
        {
          routes.map(route => (
            <PrivateRoute
              path={route.path}
              key={route.path}
              component={route.component}
              permissions={route.permissions}
            />
          ))
        }
      </Router>
    </Suspense>
  )
}

export default App
