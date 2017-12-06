import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)
const http = axios.create({
  baseURL: 'http://35.198.201.79'
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
  vote_down: [],
  vote_upx: []
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
  setEditQuestion (state,payload) {
    const idx = state.ArrQuestions.findIndex((question) => {
      return question._id === payload._id
    })
    state.ArrQuestions[idx] = payload
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
    const idx = state.AnswerQuestion.findIndex((answer) => answer._id === payload)
    state.AnswerQuestion.splice(idx, 1)
  },
  setVoteAnswer (state,payload) {
    const idx = state.AnswerQuestion.findIndex((answer) => {
      return answer._id === payload.answerId
    })
    const voteIdx = state.AnswerQuestion[idx].vote_up.findIndex((vote) => vote === payload.userId)
    if (voteIdx === -1) {
      state.AnswerQuestion[idx].vote_up.push(payload.userId)
    } else {
      alert('SUDAH VOTE MAS')
    }
  },
  setUnvoteAnswer (state,payload) {
    const idx = state.AnswerQuestion.findIndex((answer) => {
    return answer._id === payload.answerId
    })
    const voteIdx = state.AnswerQuestion[idx].vote_up.findIndex((vote) => vote === payload.userId)
    if (voteIdx === -1) {
      alert('SUDAH VOTE MAS')
    } else {
      state.AnswerQuestion[idx].vote_up.splice(0,1)
    }
  },
  setVoteQuestion (state, payload) {
    // state.ArrQuestions.forEach((question, index) => {
    //   if(question._id === payload.questionId) {
    //     state.ArrQuestions[index].vote_up.push(payload.userId)
    //   }
    // })
    //
    const idx = state.ArrQuestions.findIndex((question) => {
    return question._id === payload.questionId
    })
    // // console.log('INI INDEX', idx);
    // // console.log('INI ARTT INDEX', state.ArrQuestions[idx]);
    const voteIdx = state.ArrQuestions[idx].vote_up.findIndex((vote) => vote === payload.userId)
    console.log('INI VOTE INDEX', voteIdx);
    if (voteIdx === -1) {
      state.ArrQuestions[idx].vote_up.push(payload.userId)
    } else {
      alert('SUDAH VOTE MAS')
    }
  },
  setUnvoteQuestion (state,payload) {
    const idx = state.ArrQuestions.findIndex((question) => {
    return question._id === payload.questionId
    })
    const voteIdx = state.ArrQuestions[idx].vote_up.findIndex((vote) => vote === payload.userId)
    if (voteIdx === -1) {
      alert('SUDAH VOTE MAS')
    } else {
      state.ArrQuestions[idx].vote_up.splice(0,1)
    }
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
    var config = {
      headers: {
        token: localStorage.getItem('token')
      }
    }
    http.delete(`/questions/${idQuestions._id}`, idQuestions, config)
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
       commit('setVoteAnswer', payload)
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
      commit('setUnvoteAnswer', payload)
    })
    .catch(err => {
      console.log(err)
    })
  },

  voteUpQx ({ commit }, payload) {
    var config = {
      headers: {
        token: localStorage.getItem('token')
      }
    }
    http.put(`/questions/${payload.questionId}/voteup`, {
      userId: payload.userId
    }, config)
    .then(({data}) => {
      commit('setVoteQuestion', payload)
    })
    .catch(err => {
      console.log(err)
    })
  },

  voteDownQx ({ commit },payload) {
  console.log('INI DATA PAYLAOD', payload);
    var config = {
      headers: {
        token: localStorage.getItem('token')
      }
    }
    http.put(`/questions/${payload.questionId}/votedown`, {
      userId: payload.userId
    }, config)
    .then(({data}) => {
      console.log('INI DATA BERKURANG', data);
      commit('setUnvoteQuestion', payload)
    })
    .catch(err => {
      console.log(err)
    })
  },

  editQuestion ({commit}, payload) {
    console.log('INI PAYLOAD EDIT',payload)
    var config = {
      headers: {
        token: localStorage.getItem('token')
      }
    }
    http.put(`/questions/${payload.id_question}`, {
      title: payload.title,
      content: payload.content
    }, config)
    .then(({data}) => {
      // console.log('INI DATA EDIT BRAY', data);
      commit('setEditQuestion', data)
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
