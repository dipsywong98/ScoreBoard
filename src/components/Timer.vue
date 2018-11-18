<template>
<h2 class="scoreboard">{{renderedTime}}</h2>
</template>
<script>
import { setTimeout, clearTimeout } from 'timers';
export default {
  name: 'Timer',
  mounted(){
    this.renderTime()
  },
  props: {
    //dueTime in Unix timestamp
    dueTime: {
      type:Number,
      default:Date.now()+1000*60*3
    }
  },
  watch:{
    dueTime(){
      // console.log('dueTime Changed',val)
      clearTimeout(this.currentTimeout)
      this.renderTime()
    }
  },
  data(){
    return {
      renderedTime:'00:00',
      currentTimeout:null
    }
  },
  methods:{
    renderTime(){const currTime = Date.now()
      const left = this.dueTime - currTime
      if(left <= 0){
        this.renderedTime = '00:00'
      }else{
        let s = Math.floor(left/1000%60)
        if(s<10)s='0'+s
        const m = Math.floor(left/1000/60%10)
        this.currentTimeout = setTimeout(()=>{this.renderTime()},1000)
        this.renderedTime = `0${m}:${s}`
      }
    }
  }
}
</script>