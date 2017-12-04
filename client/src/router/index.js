import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/components/homepage'
import addQuestion from '@/components/addQuestion'
import detailsQuestions from '@/components/detailsQuestions'
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
    }
  ]
})
