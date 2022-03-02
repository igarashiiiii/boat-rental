<template>
  <v-container>
    <Head></Head> 
    <router-view></router-view>
  </v-container>
</template>
<script>
import Head from "../components/Head.vue"
export default {
  name:"mainLayout",
  components:{
    Head,
  }
}
</script>
<style>
</style>