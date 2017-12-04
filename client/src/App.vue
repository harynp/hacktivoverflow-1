<template>
  <div id="app">
    <navbar/>
    <form/>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style>
h1 {
  text-align: center;
}
</style>
