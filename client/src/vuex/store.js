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
  ArrQuestionsById: [],
  ArrAnswers: []
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
  }
}


export default new Vuex.Store ({
  state,
  mutations,
  actions
})
