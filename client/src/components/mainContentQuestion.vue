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
          <div>
            <button v-if="question.id_user._id === userId" class="fa fa-trash btn btn-danger" type="button" name="button" @click="rmvQuestions(question)"></button>
            <button v-if="question.id_user._id === userId" class="fa fa-pencil-square-o btn btn-warning" data-toggle="modal" data-target=".bs-example-modal-lg" @click="editQuestionDiComponent(question._id)"></button>
              Author : {{ question.id_user.username }}
          </div>
        </div>
      </div>
    </div>
    <!-- Large modal -->
    <!-- <button type="button" class="btn btn-primary" >Large modal</button> -->
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <h1>HALAMAN EDIT</h1>
          <form class="form-horizontal" @submit.prevent="editQuestion(edit)">
            <!-- title -->
            <div class="form-group">
              <label for="inputTitle" class="col-lg-2 control-label">Title</label>
              <div class="col-lg-10">
                <input type="text" name="title" ref="title" class="form-control" id="title" placeholder="Title" v-model="edit.title">
              </div>
            </div>
            <!-- content -->
            <div class="form-group">
              <label for="textArea" class="col-lg-2 control-label">Content</label>
              <div class="col-lg-10">
                <textarea class="form-control" name="content" ref="content" rows="3" id="textArea" v-model="edit.content"></textarea>
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Send</button></div>
            </div>
          </form>
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
      edit: {
        title: '',
        content: '',
        id_question: ''
      },
      userId: localStorage.getItem('idUser'),

    }
  },
  computed: {
  ...mapState([
    'ArrQuestions'
  ])
  },
  methods: {
    ...mapActions([
      'getQuestions',
      'rmvQuestions',
      'editQuestion'
    ]),
    editQuestionDiComponent (payload) {
      this.edit.id_question = payload
    }
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
