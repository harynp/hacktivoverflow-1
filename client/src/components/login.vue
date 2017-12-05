<template lang="html">
  <div class="container">
    <form @submit.prevent="login(formLogin)">
      <div class="form-group">
        <label class="control-label" for="focusedInput">Username</label>
        <input class="form-control" id="focusedInput" type="text" placeholder="Username ..." v-model="formLogin.username" required>
      </div>
      <div class="form-group">
        <label class="control-label" for="focusedInput">Password</label>
        <input class="form-control" id="focusedInput" type="password" placeholder="Password ..." v-model="formLogin.password" required>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary"> Login</button>
        <button type="button"  class="btn btn-danger" name="button" data-dismiss="modal" @click="kluar"> close</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'
export default {
  data () {
    return {
      formLogin: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login (dataLogin) {
      axios.post('http://localhost:3000/users/login', dataLogin)
      .then(({ data }) => {
        let decoded = jwt_decode(data)
        console.log('INI DATA DECODED', decoded);
        console.log('----->', data)
        if (data.msg === 'username not found') {
          console.log('USER TIDAK DITEMUKAN');
        } else {
          localStorage.setItem('token', data)
          localStorage.setItem('idUser', decoded.id)
          this.$router.push('/ ')
        }
      })
      .catch((err) => console.error(err))
    },
    kluar () {
      this.formLogin = {}
    }
  }
}
</script>

<style lang="css">
</style>
