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
            <!-- img -->
            <!-- <div class="form-group">
              <label for="inputTitle" class="col-lg-2 control-label">Photo</label>
              <div class="col-lg-10">
                <input class="form-control" name="imgUrl" ref="imgUrl" type="file" @change="onFileChange">
              </div>
            </div> -->
            <!-- submit form -->
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
    ]),
    onFileChange(e) {
	      var files = e.target.files || e.dataTransfer.files;
	      if (!files.length)
	        return;
	      this.createImage(files[0]);
	    },

	    createImage(file) {
	      var image = new Image();
	      var reader = new FileReader();
	      var vm = this;

	     reader.onload = (e) => {
	        vm.imgUrl = e.target.result;
	      };

	      this.imgFile = file
	      reader.readAsDataURL(file);
	    },

      uploadNewPhotos() {
				console.log("Uploading your photos");
				const config = {
          headers: { 'content-type': 'multipart/form-data' }
        }

				var formData = new FormData();
				formData.append('title', this.$refs.title.value);
				formData.append('content', this.$refs.content.value);
        // console.log('TES',imgFile);
				formData.append('imgUrl', this.imgUrl);
				this.$http.post('http://localhost:3000/questions/', formData, config)
					.then(({data}) => {
	          this.ArrQuestions.push(data)
					})
          .catch(err => {
						console.error(err)
					})
			}
    }
}
</script>

<style lang="css">
</style>
