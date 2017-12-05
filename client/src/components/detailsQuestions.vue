<template lang="html">
  <div class=" col-md-12">
   <div class="well">
     <h1>LIST QUESTIONS</h1>
    <div class="panel panel-default">
      <div class="panel-body">
        <h2>{{ ArrQuestionsById.title}}</h2>
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
    <button class="btn btn-danger" type="button" name="button" data-toggle="modal" data-target=".bs-example-modal-lg">ANSWER</button>
    </div>
    <!-- MODAL -->
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <h2>FORM ANSWER</h2>
          <form class="form-horizontal" @submit.prevent="postDua(form)">
              <div class="form-group">
                <label for="textArea" class="col-lg-2 control-label">Answer</label>
                <div class="col-lg-10">
                  <textarea class="form-control" rows="3" ref="textArea" id="textArea" v-model='form.content'></textarea>
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
    <!-- KUMPULAN ANSWER -->
    <div class="well" v-for="answer in AnswerQuestion">
     <div class="panel panel-default">
         <h5>{{ answer.content }}</h5>
     </div>
     <div class="pull-right">
       <a class="like">
         <i class="fa fa-thumbs-o-up"></i>  Like
       </a>
       <a class="dislike">
         <i class="fa fa-thumbs-o-down"></i> Dislike
       </a>
     </div>
    </div>
   <!--  -->
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
props: ['id'],
  data () {
    return {
      form: {
        content: "",
        userId: localStorage.getItem('idUser'),
        id_question: this.id
      }
    }
  },
  computed: {
    ...mapState([
      'ArrQuestionsById',
      'AnswerQuestion'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestionsById',
      'postAnswer',
      'getAllAnswer'
    ]),
    postDua (payload) {
      this.postAnswer(payload)
    }
  },
  created () {
    this.getQuestionsById(this.id)
    this.getAllAnswer(this.id)
  },
  watch: {
    id: function (newId) {
      this.getAllAnswer(newId)
    }
  }
}
</script>

<style lang="css">
h2,h5 {
  text-align: center;
}
</style>
