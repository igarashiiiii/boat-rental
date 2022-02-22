<template>
  <div id="app">
    <v-app color="cyan lighten-5">
        <Head></Head>
      <v-main>
        <router-view></router-view>
        <hr>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import Head from "./components/Head.vue"
export default {
  name:"app",
  components:{
    Head,
  }
}
</script>
<style>
</style>