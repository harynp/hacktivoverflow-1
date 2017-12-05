import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/components/homepage'
import addQuestion from '@/components/addQuestion'
import detailsQuestions from '@/components/detailsQuestions'
import login from '@/components/login'
import register from '@/components/register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homepage,
    },
    {
      path: '/add-questions',
      component: addQuestion,
    },
    {
      path: '/question-details/:id',
      component: detailsQuestions,
      props: true
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    }
  ]
})
