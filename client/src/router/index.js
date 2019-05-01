import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import RegistrationForm from '@/components/RegistrationForm'
import LoginForm from '@/components/LoginForm'
import ContactsList from '@/components/ContactsList/ContactsList'
import ContactProfile from '@/components/ContactProfile'
import GroupsList from '@/components/GroupsList/GroupsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/register',
      name: 'RegistrationForm',
      component: RegistrationForm
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm
    },
    {
      path: '/contacts',
      name: 'ContactsList',
      component: ContactsList
    },
    {
      path: '/contact/:id',
      name: 'ContactProfile',
      component: ContactProfile
    },
    {
      path: '/groups',
      name: 'GroupsList',
      component: GroupsList
    }
  ]
})
