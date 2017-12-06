<template lang="html">
  <div class="">
    <div class="well" v-for="answer in AnswerQuestion">
     <i class="fa fa-user" aria-hidden="true"> {{answer.id_user.username}}</i>
     <div class="panel panel-default">
         <h5>{{ answer.content}}</h5>
     </div>
      <div v-if="statusVote" class="">
        <button v-if="answer.id_user._id === userId" class="btn btn-danger fa fa-trash-o" type="button" name="button" @click.prevent="deleteAnswer(answer._id)"></button>
         {{answer.vote_up.length}}
        <button class="btn btn-info fa fa-thumbs-o-up" type="button" name="button" @click="voteUp(answer._id)"></button>
        <button class="btn btn-info fa fa-thumbs-o-down" type="button" name="button" @click="voteDown(answer._id)"></button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data() {
    return {
      userId: localStorage.getItem('idUser'),
      vote_up: [],
      statusVote: true
    }
  },
  computed: {
    ...mapState([
      'AnswerQuestion'
    ])
  },
  methods: {
    ...mapActions([
      'getAllAnswer',
      'postAnswer',
      'deleteAnswer'
    ]),
    voteUp (payload) {
      var config = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      this.$http.put(`/answers/${payload}/voteup/`, {
        userId: this.userId
        }, config)
        .then(({data}) => {
          console.log('DATA BERTAMBAH', data);
          // this.vote_up = data.vote_up.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    voteDown (payload) {
      var config = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      this.$http.put(`/answers/${payload}/votedown`, {
        userId: this.userId
      }, config)
      .then(({data}) => {
        console.log('DATA BERKURANG', data);
        // this.vote_up = data.vote_up.length - 1
      })
    }
  },
  created() {
    
  },
  watch: {
  }
}
</script>

<style lang="css">
</style>
