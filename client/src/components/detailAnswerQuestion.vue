<template lang="html">
  <div class="">
    <div class="well" v-for="answer in AnswerQuestion">
     <i class="fa fa-user" aria-hidden="true"> {{answer.id_user.username}}</i>
     <div class="panel panel-default">
         <h5>{{ answer.content}}</h5>
     </div>
      <button v-if="answer.id_user._id === userId" class="btn btn-danger fa fa-trash-o" type="button" name="button" @click.prevent="deleteAnswer(answer._id)"></button>
      <button class="btn btn-info fa fa-thumbs-o-up" type="button" name="button" @click="vote(answer._id)"></button> {{answer.vote_up.length}}
    </div>
  </div>

</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'
export default {
  data() {
    return {
      userId: localStorage.getItem('idUser'),
      vote_up: []
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
      'postAnswer'
    ]),
    vote(payload) {
      var config = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      this.$http.put(`/answers/${payload}/voteup/`, {
          userId: this.userId
        }, config)
        .then(({
          data
        }) => {
          console.log('INI DATA', data);
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created() {
    this.vote(this.userId)
  }
}
</script>

<style lang="css">
</style>
