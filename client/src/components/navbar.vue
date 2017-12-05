<template lang="html">
  <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
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
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li class="active" v-if="token">
          <a @click="logout">Logout</a>
        </li>
        <li class="active" v-else>
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
  computed: {

  },
  methods: {
    logout () {
      this.status = false
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="css">
</style>
