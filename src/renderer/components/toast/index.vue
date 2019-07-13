<template>
  <div class="toast" v-show="content" @click="closeToast">
    <div class="content">{{content}}</div>
  </div>
</template>
<script>
import { clearTimeout } from 'timers';
var timer = null;
export default {
  name: "Toast",
  props:{
    content:{
      type: String,
      default: ""
    }
  },
  watch:{
    content:function(newVal){
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this.$emit("closeToast")
      }, 3000);
    }
  },
  data(){
    return{
      show: false,
    }
  },
  methods: {
    closeToast(){
      this.$emit("closeToast")
    }
  }
}
</script>
<style lang="scss" scoped>
  .toast{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
      background: #000;
      padding: 3px 10px;
      border-radius: 10px;
      font-size: 14px;
      color: #fff;
    }
  }
</style>

