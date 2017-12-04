<template lang="html">
  <div class="row">
  <inputform></inputform>
  <mainContentQuestion></mainContentQuestion>
  </div>
</template>

<script>
import inputform from '@/components/inputform'
import mainContentQuestion from '@/components/mainContentQuestion'
export default {
components: {
  inputform,
    mainContentQuestion
  }
}
</script>

<style lang="css">
form {
  margin-left: 20px
}

.panel-heading {
  text-align: center;
}
</style>
