import { lazy } from 'react'

// import WithAuth from '../component/WithAuth'

const Home = lazy(() => import('../views/Home'))
const Login = lazy(() => import('../views/Login'))
const UserList = lazy(() => import('../views/User/List'))

const routes = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/user/list',
    component: UserList,
  },
  {
    path: '/user/:id/detail',
    component: UserList,
  },
  {
    path: '/profile',
    component: UserList,
    permissions: ['permissions'],
  },
]

export default routes
