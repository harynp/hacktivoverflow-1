<template lang="html">
    <div class="col-md-4">
      <div class="panel panel-default">
        <div class="panel-heading">Add Questions</div>
        <div class="panel-body">
          <form class="form-horizontal" @submit.prevent="postQuestion(form)">
            <!-- title -->
            <div class="form-group">
              <label for="inputTitle" class="col-lg-2 control-label">Title</label>
              <div class="col-lg-10">
                <input type="text" name="title" ref="title" class="form-control" id="title" placeholder="Title" v-model="form.title">
              </div>
            </div>
            <!-- content -->
            <div class="form-group">
              <label for="textArea" class="col-lg-2 control-label">Content</label>
              <div class="col-lg-10">
                <textarea class="form-control" name="content" ref="content" rows="3" id="textArea" v-model="form.content"></textarea>
              </div>
            </div>

            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
    	form: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState([
      'ArrQuestions'
    ])
  },
  methods: {
    ...mapActions([
      'postQuestion'
    ])
  }
}
</script>

<style lang="css">
</style>
