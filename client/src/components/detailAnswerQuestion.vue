<template lang="html">
  <div class="">
    <div class="well" v-for="answer in AnswerQuestion">
     <i class="fa fa-user" aria-hidden="true"> {{answer.id_user.username}}</i>
     <div class="panel panel-default">
       <h5>{{ answer.content}}</h5>
     </div>
      <div class="">
        <button v-if="answer.id_user._id === userId" class="btn btn-danger fa fa-trash-o" type="button" name="button" @click.prevent="deleteAnswer(answer._id)"></button>
         {{answer.vote_up.length}}
        <button class="btn btn-info fa fa-thumbs-o-up" type="button" name="button" @click="voteUp({answerId: answer._id, userId:userId})"></button>
        <button class="btn btn-info fa fa-thumbs-o-down" type="button" name="button" @click="voteDown({answerId: answer._id, userId:userId})"></button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data() {
    return {
      userId: localStorage.getItem('idUser')
    }
  },
  computed: {
    ...mapState([
      'AnswerQuestion',
      'vote_up'
    ])
  },
  methods: {
    ...mapActions([
      'getAllAnswer',
      'postAnswer',
      'deleteAnswer',
      'voteUp',
      'voteDown'
    ])
  },
  watch: {
    id: function (userId) {
      this.getAllAnswer(userId)
    }
  }
}
</script>

<style lang="css">
</style>
