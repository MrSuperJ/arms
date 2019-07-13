<template>
  <div id="app">
    <router-view @setToast="setToast"></router-view>
    <v-toast :content="content"  @closeToast="closeToast"/>
  </div>
</template>

<script>
import vToast from "./components/toast/index";

  export default {
    name: 'my-ele-test',
    components: {
      vToast
    },
    data(){
      return{
        content: ""
      }
    },
    methods:{
      setToast(e){
        this.content = e;
      },
      closeToast(){
        this.content = "";
      }
    },
    mounted(){
      // this.content = "非常完美"
    }
  }
</script>

<style>
  /* CSS */
</style>
