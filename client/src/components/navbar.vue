<template lang="html">
  <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Hacktiv8-Overflow</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active">
          <router-link to="/">Home</router-link>
        </li>
        <li class="active">
          <router-link to="/add-questions">+Question</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="active" v-if="token">
          <a @click="logout">Logout</a>
        </li>
        <li class="active" v-else="!token">
          <router-link to="/login">Login</router-link>
        </li>
        <li class="active">
          <router-link to="/register">Register</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    logout () {
      this.status = false
      localStorage.clear()
      this.$router.push('/login')
      window.location.reload()
    }
  }
}
</script>

<style lang="css">
</style>
