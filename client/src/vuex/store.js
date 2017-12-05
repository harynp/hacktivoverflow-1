import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)
const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const state = {
  ArrQuestions: [],
  ArrQuestionsById: {
    content: ''
  },
  AnswerQuestion: [],
  status: false,
  loginStatus: {
    status: false,
    token: null
  },
  signup: '',
  formAnswer: {
    userId: null,
    answer: null,
    questionId: null
  },
  userQuestion: null
}

const mutations = {
  setAllQuestions (state, payload) {
    console.log('ini mutations', payload)
    state.ArrQuestions = payload
  },
  setPostQuestions (state, payload) {
    state.ArrQuestions.push(payload)
  },
  setDeleteQuestions (state, payload) {
    const idx = state.ArrQuestions.findIndex((question) => question._id === payload)
    state.ArrQuestions.splice(idx, 1)
  },
  setIdQuestions (state,payload) {
    state.ArrQuestionsById = payload
  },
  setAnswerData (state,payload) {
    console.log('INI DI MUTATIONS BROO',payload);
    state.AnswerQuestion = payload
  },
  setPostAnswer (state,payload) {
    state.ArrAnswers.push(payload)
  },
  setDeleteAnswer (state,payload) {
    const idx = state.ArrAnswers.findIndex((answer) => answer._id === payload)
    state.ArrAnswers.splice(idx, 1)
  },
  setLogin (state, payload) {
   if (typeof payload.objToken === 'object') {
     state.status = {
       status: true
     }
     state.userData = {
       id: payload.objUser.id,
       username: payload.objUser.username
     }
   } else {
     localStorage.clear()
   }
 },
 setSignup (state, payload) {
   state.signup = payload
 }
}

const actions = {
  getQuestions ({commit}) {
    http.get('/questions')
    .then(({data}) => {
      console.log('INI DATA GET ACTIONS', data);
      commit('setAllQuestions', data)
    })
    .catch(err => {
      res.send(err)
    })
  },

  getQuestionsById ({commit}, IdQuestions) {
    console.log('TESASDDADAS')
    http.get(`/questions/${IdQuestions}`)
    .then(({data}) => {
      commit('setIdQuestions', data)
    })
    .catch(err => {
      res.send(err)
    })
  },

  postQuestion ({commit}, newQuestion) {
    http.post('/questions', newQuestion)
    .then(({ data }) => {
      console.log('INI DATA POST ACTIONS', data);
      commit('setPostQuestions', data)
    })
    .catch(err => {
      res.send(err)
    })
  },

  rmvQuestions({commit}, idQuestions) {
    http.delete(`/questions/${idQuestions._id}`)
    .then(({data}) => {
      commit('setDeleteQuestions', data)
    })
  },

  getAllAnswer ({ commit }, payload) {
    console.log('INI PAYLOAD', payload);
      http.get(`/answers/find/`+ payload)
      .then(({data}) => {
        console.log('ISI DATANYA GETANSWER', data);
        commit('setAnswerData', data)
      })
      .catch(err => {
        console.log('THIS IS ERROR GET ALL ANSWER BY ID QUESTION >> ' + JSON.stringify(err))
      })
    },

  postAnswer ({ dispatch, commit }, payload) {
    http.post(`/answers/`, {
      id: payload.userId,
      content: payload.content,
      id_question: payload.id_question
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(dataAnswer => {
      console.log('KAMPREEETTT',dataAnswer);
      if (dataAnswer.data.name === 'JsonWebTokenError') {
        console.log('GAGAL POST ANSWER')
      } else {
        dispatch('getAllAnswer', payload.id_question)
      }
    })
    .catch(err => {
      console.log('THIS IS ERROR POST ANSWER >> ' + JSON.stringify(err))
    })
  },

  deleteAnswer ({commit}, idAnswers) {
    http.delete(`/answers/${idAnswers._id}`)
    .then(({data}) => {
      commit('setDeleteAnswer')
    })
    .catch(err => {
      res.send(err)
    })
  },

  login ({ commit }, payload) {
    http.post('users/login', {
      username: payload.username,
      password: payload.password
    })
    .then(response => {
      console.log('this is login response  ', response.data.token)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('idUser', response.data._id)
      http.get('users/info', {
        headers: {
          token: response.data.token
        }
      })
      .then(result => {
        if (result.data.username) {
          console.log(sukses);
        }
        commit('setLogin', {objToken: response.data, objUser: result.data})
      })
      .catch(err => {
        alert('Error get user INFO')
        console.log('THIS IS ERROR LOGIN >> ' + JSON.stringify(err))
      })
    })
    .catch(err => {
      console.log(err)
    })
  },

  signup ({ commit }, formRegister) {
    http.post('/users/register', formRegister)
    .then(({ data }) => {
      console.log('berhasil daftar');
      commit('setSignup', data)
    })
    .catch(err => {
      console.log('THIS IS ERROR SIGN UP >> ' + JSON.stringify(err))
      alert('ERROR REGISTER' + err)
    })
  },

  checkLogin ({ commit }, payload) {
    http.get('users/info', {
      headers: {
        token: localStorage.token
      }
    })
      .then(result => {
        console.log('INI RESULT', result);
        if (result.data.id) {
          commit('setLogin', { objToken: {token: localStorage.token}, objUser: result.data })
        } else {
          localStorage.clear()
          this.$router.push('/')
        }
      })
      .catch(err => {
        alert('Error get user INFO')
        localStorage.clear()
        console.log('THIS IS ERROR CHECK LOGIN >> ' + JSON.stringify(err))
      })
  }
}


export default new Vuex.Store ({
  state,
  mutations,
  actions
})
