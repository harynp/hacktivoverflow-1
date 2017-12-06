<template lang="html">
    <div class=" col-md-12">
     <div class="well">
       <h1>LIST QUESTIONS</h1>
      <div class="panel panel-default" v-for="list in ArrQuestions">
        <div class="panel-body">
          <router-link class="fa fa-list-alt" :to="{path:'/question-details/'+list._id}"> {{ list.title }} - Author:{{list.id_user.username}}</router-link>
        </div>
        <div class="panel-body">
          {{ list.content }}
          <div class="pull-right">
            {{list.vote_up.length}}
            <button class="btn btn-info fa fa-thumbs-o-up" type="button" name="button" @click="voteUpQx({questionId: list._id, userId:userId})"></button>
            <button class="btn btn-info fa fa-thumbs-o-down" type="button" name="button" @click="voteDownQx({questionId: list._id, userId:userId})"></button>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data () {
    return {
      userId: localStorage.getItem('idUser')
    }
  },
  computed: {
    ...mapState([
      'ArrQuestions',
      'vote_upx'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestions',
      'voteUpQx',
      'voteDownQx'
    ])
  },
  created() {
    this.getQuestions()
  }
}
</script>

<style lang="css">
</style>
