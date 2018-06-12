import Vue from 'vue'
import Router from 'vue-router'

import Test from '@/components/Test'
import UI from '@/components/UI'
import Home from '@/components/Home'
import User from '@/components/User/User'
import AddressInfo from '@/components/User/AddressInfo'
import Driver from '@/components/Driver/Driver'
import Login from '@/components/Driver/Login'
import Register from '@/components/Driver/Register'
import RegisterStep1 from '@/components/Driver/RegisterStep1'
import RegisterStep2 from '@/components/Driver/RegisterStep2'
import RegisterStep3 from '@/components/Driver/RegisterStep3'
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
      name: 'driver',
      component: Driver,
      children:  [
        {
          path: 'login',
          component: Login
        },
        {
          path: 'register',
          component: Register,
          children:  [
            {
              path: '1',
              component: RegisterStep1
            },
            {
              path: '2',
              component: RegisterStep2
            },
            {
              path: '3',
              component: RegisterStep3
            }
          ]
        }
      ]
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
