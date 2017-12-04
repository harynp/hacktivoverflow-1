<template lang="html">
    <div class=" col-md-12">
     <div class="well">
       <h1>LIST QUESTIONS</h1>
      <div class="panel panel-default" v-for="list in ArrQuestions">
        <div class="panel-body">
          <router-link :to="{path:'/question-details/'+list._id}">{{ list.title }}</router-link>
        </div>
        <div class="panel-body">
          {{list.content}}
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  computed: {
    ...mapState([
      'ArrQuestions'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestions'
    ])
  },
  created() {
    this.getQuestions()
  }
}
</script>

<style lang="css">
</style>
