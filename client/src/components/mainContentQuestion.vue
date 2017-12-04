<template lang="html">
  <div class="col-md-8">
    <div class="panel panel-info" v-for="(question,index) in ArrQuestions">
      <div class="panel-heading">
        <h3 class="panel-title">
          <router-link :to="'questions/'+question._id">{{ question.title }}</router-link>
        </h3>
      </div>
      <div class="panel-body">
        {{ question.content }}
        <div class="pull-right">
          <button class="fa fa-trash btn btn-danger" type="button" name="button" @click="rmvQuestions(question)"></button>
          <button class="fa fa-pencil-square-o btn btn-warning" type="button" name="button" data-toggle="modal" data-target="modal-dialog"></button>
        </div>
      </div>
    </div>

<!-- MODAL -->
<!-- Large modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">Large modal</button>

<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      ...
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
      'getQuestions',
      'rmvQuestions'
    ])
  },
  created () {
    this.getQuestions()
  }
}
</script>

<style lang="css">
.action {

}
</style>
