import Vue from 'vue'
import Router from 'vue-router'

import Test from '@/components/Test'
import UI from '@/components/UI'
import Home from '@/components/Home'
import User from '@/components/User/User'
import Driver from '@/components/Driver/Driver'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/driver',
      name: 'driver',
      component: Driver
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
