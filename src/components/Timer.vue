<template>
<div>
<h2 class="scoreboard">{{renderedTime}}</h2>
<h5>{{renderedState}}</h5>
</div>
</template>
<script>
import { setTimeout, clearTimeout } from 'timers';
import constants from "../lib/constants"
const {states,stateTime} = constants
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
    },
    startTime:{
      type: Number,
      default:0
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
      currentTimeout:null,
      renderedState:''
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
      if(this.startTime==0){
        this.renderedState = states[0]
      }else{
        this.renderedState = stateTime.reduce((prev,currv,k)=>{
          if(Date.now()-this.startTime>currv*1000)return states[k]
          else return prev
        },states[0])
      }
    }
  }
}
</script>