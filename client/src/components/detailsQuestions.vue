<template lang="html">
  <div class=" col-md-12">
   <div class="well">
     <h1>LIST QUESTIONS</h1>
    <div class="panel panel-default">
      <div class="panel-body">
        <h2>{{ ArrQuestionsById.title }}</h2>
      </div>
      <div class="panel-body">
        {{ArrQuestionsById.content}}
      </div>
    </div>
    <div class="pull-right">
      <a class="like">
        <i class="fa fa-thumbs-o-up"></i>  Like
      </a>
      <a class="dislike">
        <i class="fa fa-thumbs-o-down"></i> Dislike
      </a>
    </div>
    <button class="btn btn-danger" type="button" name="button">COMMENT</button>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  props: ['id'],
  computed: {
    ...mapState([
      'ArrQuestionsById'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestionsById'
    ])
  },
  created () {
    this.getQuestionsById(this.id)
  }
}
</script>

<style lang="css">

</style>
