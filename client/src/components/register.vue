<template lang="html">
  <div class="container">
    <form @submit.prevent="signup(formRegister)">
      <div class="form-group">
        <label class="control-label" for="focusedInput">Username</label>
        <input class="form-control" id="focusedInput" type="text" placeholder="Username ..." v-model="formRegister.username" required>
      </div>
      <div class="form-group">
        <label class="control-label" for="focusedInput">Password</label>
        <input class="form-control" id="focusedInput" type="password" placeholder="Password ..." v-model="formRegister.password" required>
      </div>
      <div class="form-group">
        <label class="control-label" for="focusedInput">Email</label>
        <input class="form-control" id="focusedInput" type="text" placeholder="Email ..." v-model="formRegister.email" required>
      </div>
      <button type="submit" class="btn btn-primary"> Register</button>
      <button type="button" name="button" class="btn btn-danger" data-dismiss="modal" @click="close"> Close</button>
    </form>
    <div class="form-group">

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      formRegister: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'signup'
    ]),
    close () {
      this.formRegister = {}
    }
  }
}
</script>

<style lang="css">
</style>
