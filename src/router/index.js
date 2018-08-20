import Vue from 'vue'
import Router from 'vue-router'

import Test from '@/components/Test'
import UI from '@/components/UI'
import Home from '@/components/Home'
import User from '@/components/User/User'
import AddressInfo from '@/components/User/AddressInfo'
import Driver from '@/components/Driver/Driver'
import DriverLogin from '@/components/Driver/Login'
import DriverRegister from '@/components/Driver/Register'
import RegisterStep from '@/components/Driver/RegisterStep0'
import DriverProfile from '@/components/Driver/Profile'
import DriverOrder from '@/components/Order/DriverOrder'
import DriverOrderList from '@/components/Order/DriverOrderList'
import Activate from '@/components/Activate'
import UserOrder from '@/components/Order/UserOrder'
import UserOrderList from '@/components/Order/UserOrderList'
import SimpleOrder from '@/components/Order/SimpleOrder'
import Error404 from '@/components/Base/Error404'
import ErrorNetwork from '@/components/Base/ErrorNetwork'
import ErrorOp from '@/components/Base/ErrorOp'
import ErrorNosure from '@/components/Base/ErrorNosure'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      name: '404',
      component: Error404
    },
    {
      path: '/error-network',
      name: 'error-network',
      component: ErrorNetwork
    },
    {
      path: '/error-op',
      name: 'error-op',
      component: ErrorOp
    },
    {
      path: '/error-nosure',
      name: 'error-nosure',
      component: ErrorNosure
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/activate',
      name: 'activate',
      component: Activate
    },
    {
      path: '/simple-order',
      name: 'simple-order',
      component: SimpleOrder
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children:  [
        {
          path: 'address-info/:id',
          component: AddressInfo
        }
      ]
    },
    {
      path: '/driver',
      redirect: '/driver/profile'
    },
    {
      path: '/driver',
      name: 'driver',
      component: Driver,
      children:  [
        {
          path: 'login',
          component: DriverLogin
        },
        {
          path: 'register',
          component: DriverRegister
        },
        {
          path: 'register-step',
          component: RegisterStep
        },
        {
          path: 'profile',
          component: DriverProfile
        }
      ]
    },
    {
      path: '/user-order',
      name: 'user-order',
      component: UserOrder
    },
    {
      path: '/user-order-list',
      name: 'user-order-list',
      component: UserOrderList
    },
    {
      path: '/driver-order',
      name: 'driver-order',
      component: DriverOrder
    },
    {
      path: '/driver-order-list',
      name: 'driver-order-list',
      component: DriverOrderList
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/ui',
      name: 'ui',
      component: UI
    }
  ]
})

export default router
