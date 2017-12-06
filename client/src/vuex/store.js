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
  vote_up: [],
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
  userQuestion: null,
  vote_up: [],
  vote_down: []
}

const mutations = {
  setAllQuestions (state, payload) {
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
    state.AnswerQuestion = payload
  },
  setPostAnswer (state,payload) {
    state.ArrAnswers.push(payload)
  },
  setDeleteAnswer (state,payload) {
    const idx = state.ArrAnswers.findIndex((answer) => answer._id === payload)
    state.ArrAnswers.splice(idx, 1)
  },
  setVoteAnswer (state,payload) {
  const idx = state.ArrAnswers.findIndex((answer) => answer._id === payload)
    state.ArrQuestions[idx].push(payload.userId)
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
    http.get(`/questions/${IdQuestions}`)
    .then(({data}) => {
      commit('setIdQuestions', data)
    })
    .catch(err => {
      res.send(err)
    })
  },

  postQuestion ({commit}, newQuestion) {
    var config = {
      headers: {
        token: localStorage.getItem('token')
      }
    }
    http.post('/questions', newQuestion, config)
    .then(({ data }) => {
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
      http.get(`/answers/find/`+ payload)
      .then(({data}) => {
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
    http.delete(`/answers/${idAnswers}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      commit('setDeleteAnswer', data)
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
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('idUser', response.data._id)
      localStorage.setItem('name', response.data.username)
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
        token: localStorage.getItem('token')
      }
    })
      .then(result => {
        console.log('INI RESULT', result);
        if (result.data.id) {
          commit('setLogin', { objToken: {token: localStorage.token}, objUser: result.data })
        } else {
          localStorage.clear()
          this.$router.push('/login')
        }
      })
      .catch(err => {
        alert('Error get user INFO')
        localStorage.clear()
        console.log('THIS IS ERROR CHECK LOGIN >> ' + JSON.stringify(err))
      })
  },

  voteUp ({ commit }, payload) {
    var config = {
      headers: {
        token: localStorage.getItem('token')
      }
    }
    http.put(`/answers/${payload.answerId}/voteup/`, {
      userId: payload.userId
      }, config)
      .then(({data}) => {
        console.log('INI MASUK BRO', data);
       commit('setVoteAnswer', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  voteDown ({ commit }, payload) {
    var config = {
      headers: {
        token: localStorage.getItem('token')
      }
    }
    http.put(`/answers/${payload.answerId}/votedown`, {
      userId: payload.userId
    }, config)
    .then(({data}) => {
      console.log('INI DATA BERKURANG', data);
      commit('setVoteAnswer', data)
    })
    .catch(err => {
      console.log(err)
    })
  }
}


export default new Vuex.Store ({
  state,
  mutations,
  actions
})
