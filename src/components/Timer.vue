<template>
    <div>
        <h2 class="time">{{renderedTime}}</h2>
        <h5 class="state">{{renderedState}}</h5>
    </div>
</template>
<script>
    import {setTimeout, clearTimeout, setInterval, clearInterval} from 'timers';
    import constants from "../lib/constants"
    import beep from '../lib/beep'

    const {states, stateTime, gameTime} = constants
    export default {
        name: 'Timer',
        mounted() {
            this.renderTime()
        },
        props: {
            //dueTime in Unix timestamp
            dueTime: {
                type: Number,
                default: Date.now() + 1000 * 60 * 3
            },
            startTime: {
                type: Number,
                default: 0
            },
            silent: {
              type:Boolean,
              default: false
            },
            onDue: Function,
            onTick: Function,
            state: Number
        },
        watch: {
            dueTime() {
                // console.log('dueTime Changed',val)
                clearTimeout(this.currentTimeout)
                this.renderTime()
            }
        },
        data() {
            return {
                renderedTime: '00:00',
                currentTimeout: null,
                // renderedState: ''
            }
        },
        methods: {
            renderTime() {
                const currTime = Date.now()
                const left = Math.ceil((this.dueTime - currTime) / 1000) 
                console.log(left)
                if (currTime > this.dueTime && left <= 0) {
                    this.renderedTime = '00:00'
                    if(this.onDue)this.onDue()
                } else {
                    let s = Math.floor(left % 60)
                    if (s < 10) s = '0' + s
                    const m = Math.floor(left / 60 % 10)
                    this.currentTimeout = setTimeout(() => {
                        this.renderTime()
                    }, 1000)
                    this.renderedTime = `0${m}:${s}`
                }
                if(!this.silent && (left) > -1){
                  if (left <= 5) {
                      beep()
                  }
                  if (this.dueTime < Date.now()) {
                      this.longBeepFor(5000)
                  }
                }
                if(this.onTick)this.onTick(left)
            },
            longBeepFor(ms) {
                const i = setInterval(() => {
                    beep()
                    setTimeout(beep, 250)
                    setTimeout(beep, 500)
                }, 1000)
                setTimeout(() => {
                    clearInterval(i)
                }, ms)
            }
        },
        computed:{
            renderedState(){
                return states[this.state]
            }
        }
    }
</script>
<style scoped lang="scss">
    .time {
        font-size: 8vh;
    }
    .state {
        font-size: 4vh;
    }
</style>