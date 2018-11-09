<template>
<h2 class="scoreboard">{{renderedTime}}</h2>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  name: 'Timer',
  props: {
    dueTime: {
      type:Number,
      default:Date.now()+1000*60*3
    }
  },
  watch:{
    dueTime(val){
      console.log('way')
      this.renderTime()
    }
  },
  data(){
    return {
      renderedTime:'00:00'
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
        setTimeout(()=>{console.log('hi');this.renderTime()},1000)
        this.renderedTime = `0${m}:${s}`
      }
    }
  }
}
</script>